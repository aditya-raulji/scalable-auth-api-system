"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
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
router.post('/', auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)('USER', 'ADMIN'), task_controller_1.createTask);
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
router.get('/', auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)('USER', 'ADMIN'), task_controller_1.getAllTasks);
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
router.get('/:id', auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)('USER', 'ADMIN'), task_controller_1.getTaskById);
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
router.put('/:id', auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)('USER', 'ADMIN'), task_controller_1.updateTask);
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
router.delete('/:id', auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)('USER', 'ADMIN'), task_controller_1.deleteTask);
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
router.get('/admin/users', auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeRoles)('ADMIN'), task_controller_1.getAllUsers);
exports.default = router;
