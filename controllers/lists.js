const List = require("../models/List")

// CREATE NEW LIST

const createNewList = async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const lists = await List.create(req.body)
            res.status(200).json({ success: true, lists })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized!" })
    }
};

// DELETE LIST

const deleteList = async (req, res) => {
    if (req.user.isAdmin) {

        try {
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json({ success: true, message: "List deleted Sucessfully!" })
        } catch (err) {
            res.status(200).json({ success: false, message: err.message })
        }
    } else {
        res.status(200).json({ success: false, message: "You're not authorized!" })
    }
};

// GET ALL LISTS

const getAllLists = async (req, res) => {
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []

    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ])
                res.status(200).json({ success: true, list: list.reverse() })
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: `${typeQuery}` } },
                ])
                res.status(200).json({ success: true, list: list.reverse() })
            }
        } else {
            list = await List.aggregate([
                { $sample: { size: 10 } }
            ])
            res.status(200).json({ success: true, list: list.reverse() })
        }
        list = await List.find()
        res.status(200).json({ success: true, list: list.reverse() })
    } catch (err) {
        res.status(200).json({ success: false, message: err.message })
    }
};

module.exports = {
    createNewList,
    deleteList,
    getAllLists
};
