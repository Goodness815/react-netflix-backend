const Movie = require("../models/Movie")

// CREATE NEW MOVIE

const createNewMovie = async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const movie = await Movie.create(req.body)
            res.status(200).json({ success: true, movie })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized!" })
    }
};
// UPDATE A MOVIE

const updateMovie = async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, {
                new: true,
                runValidators: true
            })
            if (updatedMovie) {

                res.status(200).json({ success: true, updatedMovie })
            }
            res.status(200).json({ success: false, message: "invalid movie id" })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized!" })
    }
};


//DELETE A MOVIE

const deleteMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json({ success: true, message: "Movie deleted Sucessfully!" })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized!" })
    }
};

//GET SINGLE MOVIE

const getSingleMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {

            res.status(200).json({ success: true, movie })
        } else {
            res.status(200).json({ success: false, message: "movie does not exist!" })
        }

    } catch (err) {
        res.status(200).json({ success: false, message: err.message })
    }
};
//GET RANDOM MOVIE

const getRandomMovie = async (req, res) => {
    const type = req.query.type
    let movie = {}
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json({ success: true, movie: { ...movie } })
    } catch (err) {
        res.status(200).json({ success: false, message: err.message })
    }
};
//GET ALL MOVIES

const getAllMovies = async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const movies = await Movie.find()
            res.status(200).json({ success: true, movies: movies.reverse() })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized!" })
    }
};



module.exports = {
    createNewMovie,
    updateMovie,
    deleteMovie,
    getSingleMovie,
    getRandomMovie,
    getAllMovies
};
