"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const response_helper_1 = require("../utils/response.helper");
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return (0, response_helper_1.errorResponse)(res, 'Access denied. Insufficient permissions.', 403);
        }
        return next();
    };
};
exports.authorizeRoles = authorizeRoles;
// router.get('/admin/users', authenticateToken, authorizeRoles('ADMIN'), getUsers)
// router.get('/tasks', authenticateToken, authorizeRoles('USER', 'ADMIN'), getTasks)
