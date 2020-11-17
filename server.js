const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const http = require("http");
const user = require("./route/user");
const Users = require("./model/User");
const Message = require("./model/Chatmessage");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 2000;
const mongoURI = "mongodb://127.0.0.1:27017/chat-app";

process.env.ACCESS_TOKEN_SECRET = "secret";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", user);

const io = require("socket.io")(server);

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`mongoosedb is connected..`);
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}...`);
});

io.on("connect", (socket) => {
  //   console.log("User connected..", socket.id);

  socket.on("join", ({ name, defaultRoom }, callback) => {
    console.log("join ==", name);

    socket.join(defaultRoom);
    console.log(`A user joined chatroom:${name}`);

    socket.emit("message", {
      user: "admin",
      text: `${name}, welcome to chat.`,
    });

    socket.broadcast
      .to(defaultRoom)
      .emit("message", { user: "admin", text: `${name} has joined!` });
  });

  socket.on("sendMessage", async ({ name, message, defaultRoom }, callback) => {
    const user = await Users.findOne({ email: name });
    if (!user) {
      console.log("err");
    }
    const newMessage = new Message({
      userName: name,
      messages: message,
      userId: socket.id,
    });
    io.to(defaultRoom).emit("message", { user: name, text: message });
    console.log(Message);

    await newMessage.save();
  });

  socket.on("leaveRoom", ({ chatPerson }) => {
    socket.leave(chatPerson);
    console.log("A user left chatroom: " + chatPerson);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected..");
  });
});
