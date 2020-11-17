const mongoose = require("mongoose");

const messageSchemas = new mongoose.Schema({
  userName: {
    type: String,
    required: "user name is required",
    // ref: "User",
  },

  messages: {
    type: String,
    required: "Write something..",
  },

  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Message", messageSchemas);
