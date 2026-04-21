import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils/response.helper';

interface AppError extends Error {
  statusCode?: number;
  errors?: unknown;
}

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error Middleware]:', err);
  void req;
  void next;
  return errorResponse(
    res,
    err.message || 'Internal Server Error',
    err.statusCode ?? 500,
    err.errors
  );
};
