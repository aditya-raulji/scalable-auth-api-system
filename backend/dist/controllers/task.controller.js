"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const task_model_1 = require("../models/task.model");
const user_model_1 = require("../models/user.model");
const task_validator_1 = require("../validators/task.validator");
const response_helper_1 = require("../utils/response.helper");
const createTask = async (req, res) => {
    const { error, value } = task_validator_1.createTaskSchema.validate(req.body);
    if (error)
        return (0, response_helper_1.errorResponse)(res, error.message, 400);
    if (!req.user)
        return (0, response_helper_1.errorResponse)(res, 'Unauthorized', 401);
    const task = await task_model_1.taskModel.create({ data: { ...value, userId: req.user.id } });
    return (0, response_helper_1.successResponse)(res, task, 'Task created', 201);
};
exports.createTask = createTask;
const getAllTasks = async (req, res) => {
    if (!req.user)
        return (0, response_helper_1.errorResponse)(res, 'Unauthorized', 401);
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const priority = req.query.priority;
    const where = req.user.role === 'ADMIN'
        ? {
            ...(status ? { status } : {}),
            ...(priority ? { priority } : {}),
        }
        : {
            userId: req.user.id,
            ...(status ? { status } : {}),
            ...(priority ? { priority } : {}),
        };
    const [tasks, total] = await Promise.all([
        task_model_1.taskModel.findMany({
            where,
            include: req.user.role === 'ADMIN' ? { user: { select: { name: true, email: true } } } : undefined,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        }),
        task_model_1.taskModel.count({ where }),
    ]);
    return (0, response_helper_1.successResponse)(res, {
        tasks,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    }, 'Tasks fetched');
};
exports.getAllTasks = getAllTasks;
const getTaskById = async (req, res) => {
    if (!req.user)
        return (0, response_helper_1.errorResponse)(res, 'Unauthorized', 401);
    const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { error } = task_validator_1.taskIdParamSchema.validate({ id: taskId });
    if (error)
        return (0, response_helper_1.errorResponse)(res, error.message, 400);
    const task = await task_model_1.taskModel.findUnique({ where: { id: taskId } });
    if (!task)
        return (0, response_helper_1.errorResponse)(res, 'Task not found', 404);
    if (req.user.role !== 'ADMIN' && task.userId !== req.user.id) {
        return (0, response_helper_1.errorResponse)(res, 'Access denied. Insufficient permissions.', 403);
    }
    return (0, response_helper_1.successResponse)(res, task, 'Task fetched');
};
exports.getTaskById = getTaskById;
const updateTask = async (req, res) => {
    if (!req.user)
        return (0, response_helper_1.errorResponse)(res, 'Unauthorized', 401);
    const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { error: idError } = task_validator_1.taskIdParamSchema.validate({ id: taskId });
    if (idError)
        return (0, response_helper_1.errorResponse)(res, idError.message, 400);
    const { error: bodyError, value } = task_validator_1.updateTaskSchema.validate(req.body);
    if (bodyError)
        return (0, response_helper_1.errorResponse)(res, bodyError.message, 400);
    const task = await task_model_1.taskModel.findUnique({ where: { id: taskId } });
    if (!task)
        return (0, response_helper_1.errorResponse)(res, 'Task not found', 404);
    if (req.user.role !== 'ADMIN' && task.userId !== req.user.id) {
        return (0, response_helper_1.errorResponse)(res, 'Access denied. Insufficient permissions.', 403);
    }
    const updatedTask = await task_model_1.taskModel.update({ where: { id: task.id }, data: value });
    return (0, response_helper_1.successResponse)(res, updatedTask, 'Task updated');
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    if (!req.user)
        return (0, response_helper_1.errorResponse)(res, 'Unauthorized', 401);
    const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { error } = task_validator_1.taskIdParamSchema.validate({ id: taskId });
    if (error)
        return (0, response_helper_1.errorResponse)(res, error.message, 400);
    const task = await task_model_1.taskModel.findUnique({ where: { id: taskId } });
    if (!task)
        return (0, response_helper_1.errorResponse)(res, 'Task not found', 404);
    if (req.user.role !== 'ADMIN' && task.userId !== req.user.id) {
        return (0, response_helper_1.errorResponse)(res, 'Access denied. Insufficient permissions.', 403);
    }
    await task_model_1.taskModel.delete({ where: { id: task.id } });
    return (0, response_helper_1.successResponse)(res, null, 'Task deleted successfully');
};
exports.deleteTask = deleteTask;
const getAllUsers = async (req, res) => {
    if (!req.user)
        return (0, response_helper_1.errorResponse)(res, 'Unauthorized', 401);
    const users = await user_model_1.userModel.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
        orderBy: { createdAt: 'desc' },
    });
    return (0, response_helper_1.successResponse)(res, users, 'Users fetched');
};
exports.getAllUsers = getAllUsers;
