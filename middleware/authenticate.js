import { decodeToken } from "../utils/tokens.js"

function authenticate(req, res, next) {
    try {
        let tokenHeader = req.headers.authorization;
        console.log("Authorization Header:", tokenHeader);  // Логування заголовка

        if (!tokenHeader || !tokenHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "You're not authorized to do this action!" });
        }

        tokenHeader = tokenHeader.split(' ')[1];  // Отримуємо сам токен

        const decoded = decodeToken(tokenHeader);
        console.log("Decoded Token:", decoded);  // Логування результату декодування

        if (!decoded || !decoded.user_id) {
            return res.status(401).json({ message: "Invalid token, user not authenticated!" });
        }

        req.user = { user_id: decoded.user_id };
        console.log("User ID set in req.user:", req.user);  // Логування user_id

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "You're not authorized to do this action!" });
    }
}





export default authenticate;