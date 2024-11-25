"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authteste = Authteste;
const jsonwebtoken_1 = require("jsonwebtoken");
function Authteste(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({
            message: "Token inválido",
        });
    }
    const [, token] = authToken.split(" ");
    try {
        (0, jsonwebtoken_1.verify)(token, "90bf8ebb-c77c-4298-8e2e-6e44bdc96773");
        return next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Token inválido",
        });
    }
}
