import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional().allow(''),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').default('MEDIUM'),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional().allow(''),
  status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').optional(),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').optional(),
});

export const taskIdParamSchema = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required(),
});
