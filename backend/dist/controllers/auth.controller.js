"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const env_1 = require("../config/env");
const auth_validator_1 = require("../validators/auth.validator");
const response_helper_1 = require("../utils/response.helper");
const sanitizeUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});
const register = async (req, res) => {
    const { error, value } = auth_validator_1.registerSchema.validate(req.body);
    if (error)
        return (0, response_helper_1.errorResponse)(res, error.message, 400);
    const existing = await user_model_1.userModel.findUnique({ where: { email: value.email } });
    if (existing)
        return (0, response_helper_1.errorResponse)(res, 'Email already exists', 409);
    const hashedPassword = await bcryptjs_1.default.hash(value.password, 12);
    const user = await user_model_1.userModel.create({
        data: { ...value, password: hashedPassword, role: 'USER' },
    });
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, env_1.env.jwtSecret, {
        expiresIn: '7d',
    });
    return (0, response_helper_1.successResponse)(res, { user: sanitizeUser(user), token }, 'User registered', 201);
};
exports.register = register;
const login = async (req, res) => {
    const { error, value } = auth_validator_1.loginSchema.validate(req.body);
    if (error)
        return (0, response_helper_1.errorResponse)(res, error.message, 400);
    const user = await user_model_1.userModel.findUnique({ where: { email: value.email } });
    if (!user)
        return (0, response_helper_1.errorResponse)(res, 'User not found', 404);
    const isMatch = await bcryptjs_1.default.compare(value.password, user.password);
    if (!isMatch)
        return (0, response_helper_1.errorResponse)(res, 'Unauthorized', 401);
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, env_1.env.jwtSecret, {
        expiresIn: '7d',
    });
    return (0, response_helper_1.successResponse)(res, { user: sanitizeUser(user), token }, 'Login successful');
};
exports.login = login;
const getMe = async (req, res) => {
    if (!req.user)
        return (0, response_helper_1.errorResponse)(res, 'Unauthorized', 401);
    const user = await user_model_1.userModel.findUnique({
        where: { id: req.user.id },
        select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });
    if (!user)
        return (0, response_helper_1.errorResponse)(res, 'User not found', 404);
    return (0, response_helper_1.successResponse)(res, user, 'Current user fetched');
};
exports.getMe = getMe;
