import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
setupSwagger(app);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(errorMiddleware);

export default app;
