const User = require("../models/User")
const CryptoJS = require("crypto-js");

// UPDATE USER INFORMATION

const updateUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {
                new: true,
                runValidators: true
            })
            const { password: underfined, ...info } = updatedUser._doc
            res.status(200).json({ success: true, user: info })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized to update this user!" })
    }
};

//DELETE USER INFORMATION

const deleteUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ success: true, message: "Deleted Sucessfully!" })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized to delete this user!" })
    }
};

// GET A SINGLE USER

const getSingleUser = async (req, res) => {
    if (req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const { password: underfined, ...info } = user._doc
            if (user) {

                res.status(200).json({ success: true, user: user })
            } else {
                res.status(200).json({ success: false, message: "user does not exist!" })
            }

        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "Invalid id" })
    }
};

//GET ALL USERS

const getAllUsers = async (req, res) => {
    const query = req.query.new
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
            res.status(200).json({ success: true, users: users })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized to access users!" })
    }
};

//UPDATE USER STATISTICS

const getUserStat = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const userData = await User.aggregate([
                {
                    $project: {
                        month: { $month: "$createdAt" }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 }
                    }
                }
            ])
            res.status(200).json({ success: true, users: userData })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized to access users!" })
    }

}


module.exports = {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers,
    getUserStat
};
