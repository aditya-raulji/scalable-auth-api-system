"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModel = void 0;
const db_1 = require("../config/db");
exports.taskModel = db_1.prisma.task;
