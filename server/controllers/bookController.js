const Book = require('../models/bookModel');

exports.getBooks = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const totalBooks = await Book.countDocuments();
        const books = await Book.find()
            .populate({
                path: "addedBy",
                select: "name email",
            })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: books,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
            message: "Books Fetched Successfully!",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


exports.addBook = async (req, res) => {
    try {
        const newBook = new Book({ ...req.body });
        await newBook.save();
        res.status(200).json({ data: newBook, message: "Book Created Successfully!", success: true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
