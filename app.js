import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, sequelize } from "./config/connection.js";

// Models
import "./models/user.js";
import "./models/book.js";
import "./models/review.js";

// Routes
import bookRoutes from "./routes/book.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/review.js";
import notFoundHandler from "./middleware/not-found.js";

dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());

// Base URL for routes
const baseURL = "/api/v1";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);
app.use(notFoundHandler);

const startServer = async () => {
    try {
        await connectDB();
        // await sequelize.sync({ force: true }); // Видалить і створить заново всі таблиці
        console.log("Database synced successfully!");

        const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`Server running on port ${port}!`));
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
