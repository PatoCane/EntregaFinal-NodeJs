import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY || "1twp1969vwetv0622cpa";

export const authentication = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "No se envió el header Authorization" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ error: "Formato de token incorrecto" });
    }

    const token = parts[1].replace(/"/g, ""); // quita comillas si vienen

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            console.log("ERROR JWT:", err);
            return res.status(403).json({ error: "Token inválido o expirado" });
        }

        req.user = decoded;
        next();
    });
};