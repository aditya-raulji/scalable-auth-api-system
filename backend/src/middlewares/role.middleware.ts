import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import { errorResponse } from '../utils/response.helper';

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 'Access denied. Insufficient permissions.', 403);
    }
    return next();
  };
};

// router.get('/admin/users', authenticateToken, authorizeRoles('ADMIN'), getUsers)
// router.get('/tasks', authenticateToken, authorizeRoles('USER', 'ADMIN'), getTasks)
