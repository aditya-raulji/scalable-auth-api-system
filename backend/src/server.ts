import app from './app';
import { env } from './config/env';

const server = app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
  console.log(`Swagger docs at http://localhost:${env.port}/api-docs`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
