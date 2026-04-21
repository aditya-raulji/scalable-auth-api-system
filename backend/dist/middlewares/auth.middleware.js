"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRateLimiter = exports.optionalAuth = exports.authenticateToken = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const response_helper_1 = require("../utils/response.helper");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return (0, response_helper_1.errorResponse)(res, 'Access denied. No token provided.', 401);
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return (0, response_helper_1.errorResponse)(res, 'Access denied. No token provided.', 401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.user = decoded;
        return next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return (0, response_helper_1.errorResponse)(res, 'Token expired. Please login again.', 401);
        }
        return (0, response_helper_1.errorResponse)(res, 'Invalid token.', 403);
    }
};
exports.authenticateToken = authenticateToken;
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return next();
    const token = authHeader.split(' ')[1];
    if (!token)
        return next();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.user = decoded;
    }
    catch {
        // Intentionally ignore token parse errors for optional auth.
    }
    return next();
};
exports.optionalAuth = optionalAuth;
exports.authRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
