import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export function decodeToken(token) {
    console.log('Token to Decode:', token);
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        console.log('Decoded Token:', decoded);
        return decoded;
    } catch (error) {
        console.log('Error decoding token:', error);
        throw new Error('Invalid token');
    }
}



export function createToken(user_id, username) {
    return jwt.sign({ user_id, username }, process.env.TOKEN_SECRET_KEY);
}