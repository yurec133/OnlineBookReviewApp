import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql'
    });

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database!");

        await sequelize.sync();
        console.log("Database synchronized!");
    } catch (error) {
        console.log("Failed to connect to the database:", error.message);
    }
}

