import { Response } from 'express';
import { Priority, TaskStatus } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';
import { taskModel } from '../models/task.model';
import { userModel } from '../models/user.model';
import { createTaskSchema, taskIdParamSchema, updateTaskSchema } from '../validators/task.validator';
import { errorResponse, successResponse } from '../utils/response.helper';

export const createTask = async (req: AuthRequest, res: Response) => {
  const { error, value } = createTaskSchema.validate(req.body);
  if (error) return errorResponse(res, error.message, 400);
  if (!req.user) return errorResponse(res, 'Unauthorized', 401);

  const task = await taskModel.create({ data: { ...value, userId: req.user.id } });
  return successResponse(res, task, 'Task created', 201);
};

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  if (!req.user) return errorResponse(res, 'Unauthorized', 401);

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const skip = (page - 1) * limit;

  const status = req.query.status as TaskStatus | undefined;
  const priority = req.query.priority as Priority | undefined;

  const where =
    req.user.role === 'ADMIN'
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
    taskModel.findMany({
      where,
      include: req.user.role === 'ADMIN' ? { user: { select: { name: true, email: true } } } : undefined,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    taskModel.count({ where }),
  ]);

  return successResponse(res, {
    tasks,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }, 'Tasks fetched');
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  if (!req.user) return errorResponse(res, 'Unauthorized', 401);
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  const { error } = taskIdParamSchema.validate({ id: taskId });
  if (error) return errorResponse(res, error.message, 400);

  const task = await taskModel.findUnique({ where: { id: taskId } });
  if (!task) return errorResponse(res, 'Task not found', 404);

  if (req.user.role !== 'ADMIN' && task.userId !== req.user.id) {
    return errorResponse(res, 'Access denied. Insufficient permissions.', 403);
  }

  return successResponse(res, task, 'Task fetched');
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  if (!req.user) return errorResponse(res, 'Unauthorized', 401);
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  const { error: idError } = taskIdParamSchema.validate({ id: taskId });
  if (idError) return errorResponse(res, idError.message, 400);

  const { error: bodyError, value } = updateTaskSchema.validate(req.body);
  if (bodyError) return errorResponse(res, bodyError.message, 400);

  const task = await taskModel.findUnique({ where: { id: taskId } });
  if (!task) return errorResponse(res, 'Task not found', 404);

  if (req.user.role !== 'ADMIN' && task.userId !== req.user.id) {
    return errorResponse(res, 'Access denied. Insufficient permissions.', 403);
  }

  const updatedTask = await taskModel.update({ where: { id: task.id }, data: value });
  return successResponse(res, updatedTask, 'Task updated');
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  if (!req.user) return errorResponse(res, 'Unauthorized', 401);
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  const { error } = taskIdParamSchema.validate({ id: taskId });
  if (error) return errorResponse(res, error.message, 400);

  const task = await taskModel.findUnique({ where: { id: taskId } });
  if (!task) return errorResponse(res, 'Task not found', 404);

  if (req.user.role !== 'ADMIN' && task.userId !== req.user.id) {
    return errorResponse(res, 'Access denied. Insufficient permissions.', 403);
  }

  await taskModel.delete({ where: { id: task.id } });
  return successResponse(res, null, 'Task deleted successfully');
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  if (!req.user) return errorResponse(res, 'Unauthorized', 401);

  const users = await userModel.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: 'desc' },
  });
  return successResponse(res, users, 'Users fetched');
};
