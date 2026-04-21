"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma = global.prisma || new client_1.PrismaClient();
exports.prisma = prisma;
prisma
    .$connect()
    .then(() => {
    console.log('Prisma connected successfully');
})
    .catch((error) => {
    console.error('Prisma connection error:', error);
});
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
