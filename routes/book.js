import { Router } from "express";
import * as bookControllers from "../controllers/book.js";
import * as reviewControllers from "../controllers/review.js";

const router = Router();

router.get("/books", bookControllers.getAllBooks);
router.post("/books", bookControllers.addBook);
router.get("/books/isbn/:ISBN", bookControllers.getBooksByISBN);
router.get("/books/author/:author", bookControllers.getBooksByAuthor);
router.get("/books/title/:title", bookControllers.getBooksByTitle);
router.post("/books/:id/reviews", reviewControllers.addReview);
router.get("/books/:id/reviews", reviewControllers.getReview);
router.delete("/books/:id/reviews", reviewControllers.deleteReview);



export default router;