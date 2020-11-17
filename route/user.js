const express = require("express");
const router = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/User");
const ChatmessageDb = require("../model/Chatmessage");
const { isAuth } = require("../isAuth/isAuth");
const { createAccessToken, createRefreshToken } = require("../tokens/tokens");

router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

process.env.REFRESH_TOKEN_SECRET = "secret";
process.env.ACCESS_TOKEN_SECRET = "secret";

// register API
router.post("/register", (req, res) => {
  console.log("all data from database==", Users);
  const userData = {
    name: req.body.name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: req.body.password,
    created: new Date(),
  };
  console.log("new user input data==", userData);
  Users.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // new user
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          Users.create(userData)
            .then((user) => {
              console.log(`${user.email} is register`);
              res.json({ status: `${user.email} is register` });
            })
            .catch((err) => {
              console.log(`error1:${err}`);
              res.send(`error:${err}`);
            });
        });
      } else {
        console.log(`user exist`);
        res.json({ status: `user already exist` });
      }
    })
    .catch((err) => {
      res.send(`error:${err}`);
    });
});
var cookieParser = require("cookie-parser");
router.use(cookieParser());

//login API
router.post("/login", (req, res) => {
  console.log(req.headers.origin);
  console.log(req.body);

  Users.findOne({
    email: req.body.email,
  })
    .then(async (user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          };
          console.log("before add refresh token==", user);

          const accesstoken = await createAccessToken(payload.email);
          const refreshtoken = await createRefreshToken(payload.email);

          user
            .updateOne(
              { $set: { refresh_token: refreshtoken } },
              { upsert: true }
            )
            .then((result, err) => {
              // send refresh token in cookie
              res.cookie("secret", refreshtoken, {
                httpOnly: true,
                // path: "/users/refresh_token",
              });
              //   console.log("cookies==", req.cookies.secret);
              res.send({
                accesstoken,
                email: user.email,
              });
              console.log("user==", result);
              //   console.log(`after add refresh Token= ${user}`);
            });
        } else {
          res.json({ error: `Incorrect Id or pasword ` });
        }
      } else {
        res.json({ error: `User does not exist` });
      }
    })
    .catch((err) => {
      console.log(`error1 ${err}`);

      res.send(err);
    });
});

// logout API
router.get("/logout", (req, res) => {
  res.clearCookie("secret");
  return res.send({
    message: "Logged out",
  });
});

// profile API
router.get("/profile", async (req, res) => {
  try {
    const userData = isAuth(req, res);

    if (userData) {
      console.log("userData1===", userData);
      const allData = await Users.find({});
      const usersEmail = allData.map((user) => user.email);
      // console.log("userData2===", usersEmail);

      res.send(userData);
    }
  } catch (err) {
    res.send({ err: `User Login again` });
  }
});

// get a new access token from refresh token
router.get("/refresh_token", (req, res) => {
  const token = req.cookies.secret;
  console.log("token==", token);

  //  if token is empty
  if (!token) return res.send({ accesstoken: "" });
  let payload = null;

  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log("payload from refeshtoken route=", payload);
  } catch (err) {
    return res.send({ accesstoken: "" });
  }

  // console.log("bbb=")
  Users.findOne({ email: payload.email }).then(async (verifiedUser) => {
    console.log(verifiedUser);
    if (!verifiedUser) {
      return res.send({ accesstoken: "" });
    }

    if (verifiedUser.refresh_token !== token) {
      return res.send({ accesstoken: "" });
    }
    const { email } = payload;
    const accesstoken = await createAccessToken(payload.email);
    const refreshtoken = await createRefreshToken(payload.email);

    // save updated refresh token in db

    verifiedUser
      .updateOne({ $set: { refresh_token: refreshtoken } }, { upsert: true })
      .then((result, err) => {
        res.cookie("secret", refreshtoken, {
          httpOnly: true,
          // path: "/users/refresh_token",
        });
        return res.send({
          accesstoken,
          email,
        });
      });
  });
});
module.exports = router;
