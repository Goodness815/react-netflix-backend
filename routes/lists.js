const express = require("express")
const router = express.Router()
const {
    createNewList,
    deleteList,
    getAllLists
} = require("../controllers/lists")

router.route("/").get(getAllLists).post(createNewList)
router.route("/:id").delete(deleteList)
module.exports = router;
