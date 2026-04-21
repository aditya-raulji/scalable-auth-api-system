"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskIdParamSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTaskSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required(),
    description: joi_1.default.string().max(500).optional().allow(''),
    priority: joi_1.default.string().valid('LOW', 'MEDIUM', 'HIGH').default('MEDIUM'),
});
exports.updateTaskSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).optional(),
    description: joi_1.default.string().max(500).optional().allow(''),
    status: joi_1.default.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').optional(),
    priority: joi_1.default.string().valid('LOW', 'MEDIUM', 'HIGH').optional(),
});
exports.taskIdParamSchema = joi_1.default.object({
    id: joi_1.default.string().guid({ version: ['uuidv4', 'uuidv5'] }).required(),
});
