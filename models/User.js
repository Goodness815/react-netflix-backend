const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email!'
        ],
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    profilePic: { type: String, default: "https://i.pinimg.com/474x/bd/ee/4c/bdee4c328550aaf21aa9f43fd19e2136.jpg" },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)