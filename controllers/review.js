import review from "../models/review.js";

export async function addReview(req, res) {
    try {
        const { user_id } = req.user; // отримуємо user_id з токену
        const book_id = req.params.id; // отримуємо book_id з параметрів
        const { review_text } = req.body; // отримуємо текст рецензії з тіла запиту

        // Log the values to ensure they are correct
        console.log("Authenticated User ID:", user_id);
        console.log("Book ID:", book_id);
        console.log("Review Text:", review_text);

        if (!user_id || !book_id || !review_text) {
            return res.status(400).json({
                message: "Missing required fields: user_id, book_id, or review_text"
            });
        }

        // Використовуємо upsert для додавання або оновлення рецензії
        const [newReview, created] = await review.upsert({
            userId: user_id,  // тут важливо, щоб було 'userId', а не 'UserId'
            bookId: book_id,  // також потрібно використовувати camelCase для полів
            review_text,
        });

        if (created) {
            return res.json({
                message: `Review added successfully!`,
                review: newReview // повертаємо створену рецензію
            });
        }

        return res.json({
            message: `Review updated successfully!`,
            review: newReview // повертаємо оновлену рецензію
        });

    } catch (error) {
        console.error("Error in addReview:", error);
        res.status(500).json({
            message: "Internal Server Error!!",
            error: error.message
        });
    }
}

export async function getReview(req, res) {
    try {
        const { id } = req.params;
        console.log(`Fetching reviews for book ID: ${id}`);

        const bookReview = await review.findAll({
            attributes: ["review_text"],
            where: { bookId: id } // змінено з `BookId` на `bookId`
        });

        if (!bookReview.length) {
            return res.json({ message: "No review found for this book!" });
        }

        res.json({ message: "Review found for this book", bookReview });
    } catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export async function deleteReview(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Review deleted successfully!" });
        }

        const { user_id } = req.user;
        const { id } = req.params;

        const deletedReview = await review.destroy({ where: { userId: user_id, bookId: id } });

        if (!deletedReview) {
            return res.status(404).json({ message: "No review found for this user to delete!" });
        }

        res.json({ message: "Review deleted successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}





