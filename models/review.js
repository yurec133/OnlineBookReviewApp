import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

// models
import user from "./user.js";
import book from "./book.js";

const review = sequelize.define("review", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    review_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: book,
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    freezeTableName: true,
    timestamps: true,
});


user.hasMany(review, { foreignKey: "userId" });
book.hasMany(review, { foreignKey: "bookId" });
review.belongsTo(user, { foreignKey: "userId" });
review.belongsTo(book, { foreignKey: "bookId" });


export default review;
