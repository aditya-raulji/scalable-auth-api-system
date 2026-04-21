import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient, Priority, Role, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();

const sampleTasks = [
  { title: 'Setup project board', description: 'Create initial tracking board', status: TaskStatus.PENDING, priority: Priority.HIGH },
  { title: 'Write API docs', description: 'Document authentication endpoints', status: TaskStatus.IN_PROGRESS, priority: Priority.MEDIUM },
  { title: 'Implement validation', description: 'Add Joi schemas for all routes', status: TaskStatus.COMPLETED, priority: Priority.HIGH },
  { title: 'Fix UI bugs', description: 'Resolve dashboard rendering glitches', status: TaskStatus.PENDING, priority: Priority.LOW },
  { title: 'Review pull requests', description: 'Check pending backend reviews', status: TaskStatus.IN_PROGRESS, priority: Priority.MEDIUM },
];

async function seedForUser(userId: string) {
  await prisma.task.deleteMany({ where: { userId } });
  await prisma.task.createMany({
    data: sampleTasks.map((task) => ({ ...task, userId })),
  });
}

async function main() {
  const adminPasswordHash = await bcrypt.hash('Admin@123', 12);
  const userPasswordHash = await bcrypt.hash('User@123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: { name: 'Admin User', role: Role.ADMIN, password: adminPasswordHash },
    create: { name: 'Admin User', email: 'admin@test.com', password: adminPasswordHash, role: Role.ADMIN },
  });

  const userOne = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: { name: 'Demo User', role: Role.USER, password: userPasswordHash },
    create: { name: 'Demo User', email: 'user@test.com', password: userPasswordHash, role: Role.USER },
  });

  const userTwo = await prisma.user.upsert({
    where: { email: 'jane@test.com' },
    update: { name: 'Jane Smith', role: Role.USER, password: userPasswordHash },
    create: { name: 'Jane Smith', email: 'jane@test.com', password: userPasswordHash, role: Role.USER },
  });

  await seedForUser(admin.id);
  await seedForUser(userOne.id);
  await seedForUser(userTwo.id);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Database seeded successfully');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
