import book from "../models/book.js"

export async function getAllBooks(req, res) {
    try {
        const books = await book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export async function addBook(req, res) {
    try {
        const { ISBN, title, author } = req.body;

        if (!ISBN || !title || !author) {
            return res.status(400).json({ message: "Please provide all the required fields: ISBN, title, and author." });
        }

        const foundBook = await book.findOne({ where: { ISBN } });
        if (foundBook) {
            return res.status(400).json({ message: "Book with this ISBN already exists." });
        }

        const newBook = await book.create({ ISBN, title, author });
        res.status(201).json({ message: "Book added successfully!", newBook });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export async function getBooksByISBN(req, res) {
    try {
        const { ISBN } = req.params;

        if (!ISBN) {
            return res.status(400).json({ message: "Please, provide a valid ISBN Code!" });
        }

        const foundBooks = await book.findAll({ where: { ISBN } });

        if (foundBooks.length) {
            return res.json({ message: "Books are Found!!", foundBooks });
        }

        res.json({ message: "No book found with this ISBN Code!" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export async function getBooksByTitle(req, res) {
    try {
        const { title } = req.params;

        if (!title) {
            return res.status(400).json({ message: "Please, provide a valid title!" });
        }
        const foundBooks = await book.findAll({ where: { title } });

        if (foundBooks.length) {
            return res.json({ message: "Books are Found!!", foundBooks });
        }

        res.json({ message: "No book found with this title!" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!!", error: error.message });
    }
}


export async function getBooksByAuthor(req, res) {
    try {
        const { author } = req.params;

        if (!author) {
            return res.status(400).json({ message: "Please, provide a valid author name!" });
        }

        const foundBooks = await book.findAll({ where: { author } });

        if (foundBooks.length) {
            return res.json({ message: "Books are Found!!", foundBooks });
        }

        res.json({ message: "No book found with this author!" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!!", error: error.message });
    }
}

