"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const response_helper_1 = require("../utils/response.helper");
const errorMiddleware = (err, req, res, next) => {
    void req;
    void next;
    return (0, response_helper_1.errorResponse)(res, err.message || 'Internal Server Error', err.statusCode ?? 500, err.errors);
};
exports.errorMiddleware = errorMiddleware;
