import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model';
import { env } from '../config/env';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { errorResponse, successResponse } from '../utils/response.helper';
import { AuthRequest } from '../middlewares/auth.middleware';

const sanitizeUser = (user: { id: string; name: string; email: string; role: string; createdAt: Date; updatedAt: Date }) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const register = async (req: Request, res: Response) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return errorResponse(res, error.message, 400);

  const existing = await userModel.findUnique({ where: { email: value.email } });
  if (existing) return errorResponse(res, 'Email already exists', 409);

  const hashedPassword = await bcrypt.hash(value.password, 12);
  const user = await userModel.create({
    data: { ...value, password: hashedPassword, role: 'USER' },
  });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwtSecret, {
    expiresIn: '7d',
  });

  return successResponse(
    res,
    { user: sanitizeUser(user), token },
    'User registered',
    201
  );
};

export const login = async (req: Request, res: Response) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return errorResponse(res, error.message, 400);

  const user = await userModel.findUnique({ where: { email: value.email } });
  if (!user) return errorResponse(res, 'User not found', 404);

  const isMatch = await bcrypt.compare(value.password, user.password);
  if (!isMatch) return errorResponse(res, 'Unauthorized', 401);

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwtSecret, {
    expiresIn: '7d',
  });
  return successResponse(res, { user: sanitizeUser(user), token }, 'Login successful');
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) return errorResponse(res, 'Unauthorized', 401);

  const user = await userModel.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  });

  if (!user) return errorResponse(res, 'User not found', 404);
  return successResponse(res, user, 'Current user fetched');
};
