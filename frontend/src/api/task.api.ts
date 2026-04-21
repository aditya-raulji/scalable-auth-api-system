import { authApi } from './auth.api';

export interface TaskPayload {
  title: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export const getTasksApi = (params?: Record<string, string | number>) =>
  authApi.get('/tasks', { params });

export const createTaskApi = (payload: TaskPayload) => authApi.post('/tasks', payload);

export const updateTaskApi = (id: string, payload: TaskPayload) => authApi.put(`/tasks/${id}`, payload);

export const deleteTaskApi = (id: string) => authApi.delete(`/tasks/${id}`);

export const getUsersApi = () => authApi.get('/tasks/admin/users');
