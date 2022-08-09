const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require("../errors")

// Register A New User

const register = async (req, res) => {
    try {
        const user = await User.create({ username: req.body.username, email: req.body.email, password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY || "netflixbackend").toString() })
        const { password: underfined, ...info } = user._doc
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY || "netflixbackend", { expiresIn: "5d" })
        res.status(201).json({ success: true, user: { ...info, accessToken } })
    } catch (err) {
        res.status(200).json({ success: false, message: err.message })
    }
};

// Login A User 

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide both email and password!')
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new UnauthenticatedError('Incorrect email or password!')
        }
        // check password
        var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY || "netflixbackend");
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText !== password) {
            throw new UnauthenticatedError('Incorrect email or password!')
        }
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY || "netflixbackend", { expiresIn: "5d" })
        const { password: underfined, ...info } = user._doc
        res.status(200).json({ success: true, user: { ...info, accessToken } })


    } catch (err) {
        res.status(200).json({ success: false, message: err.message })
    }



};


module.exports = {
    register,
    login
};
