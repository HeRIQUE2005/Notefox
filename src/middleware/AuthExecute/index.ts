import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function Authteste(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            message: "Token inválido",
        });
    }

    const [, token] = authToken.split(" ");
    try {
        verify(token, "90bf8ebb-c77c-4298-8e2e-6e44bdc96773");
        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Token inválido",
        });
    }
}


