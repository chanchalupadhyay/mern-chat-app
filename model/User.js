const mongoose = require("mongoose");


const userSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    password: {
        type: String,
        required: "password is required"

    },
    email: {
        type: String,
        required: "email is required"
    },
    phone_number: {
        type: Number,
    },

    refresh_token: {}
})

module.exports = mongoose.model("User", userSchemas);