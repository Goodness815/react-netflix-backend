const express = require("express")
const router = express.Router()
const {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers,
    getUserStat
} = require("../controllers/users")

router.route("/userstat").get(getUserStat)
router.route("/").get(getAllUsers)
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser)

module.exports = router;
