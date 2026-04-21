import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllUsers,
  getTaskById,
  updateTask,
} from '../controllers/task.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', authenticateToken, authorizeRoles('USER', 'ADMIN'), createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks with filters and pagination
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tasks fetched
 */
router.get('/', authenticateToken, authorizeRoles('USER', 'ADMIN'), getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task fetched
 *       404:
 *         description: Task not found
 */
router.get('/:id', authenticateToken, authorizeRoles('USER', 'ADMIN'), getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put('/:id', authenticateToken, authorizeRoles('USER', 'ADMIN'), updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete('/:id', authenticateToken, authorizeRoles('USER', 'ADMIN'), deleteTask);

/**
 * @swagger
 * /tasks/admin/users:
 *   get:
 *     summary: Get all users (admin)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Users fetched
 *       403:
 *         description: Forbidden
 */
router.get('/admin/users', authenticateToken, authorizeRoles('ADMIN'), getAllUsers);

export default router;
