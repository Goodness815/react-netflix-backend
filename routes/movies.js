const express = require("express")
const router = express.Router()
const {
    createNewMovie,
    updateMovie,
    deleteMovie,
    getSingleMovie,
    getRandomMovie,
    getAllMovies
} = require("../controllers/movies")

router.route("/").get(getAllMovies)
router.route("/").post(createNewMovie)
router.route("/random").get(getRandomMovie)
router.route("/:id").put(updateMovie).delete(deleteMovie)
router.route("/find/:id").get(getSingleMovie)

module.exports = router;
