import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  createTaskApi,
  deleteTaskApi,
  getTasksApi,
  TaskPayload,
  updateTaskApi,
} from '../api/task.api';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  userId: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

export interface TaskFilters {
  status?: TaskStatus | 'ALL';
  priority?: TaskPriority | 'ALL';
  search?: string;
  page?: number;
  limit?: number;
}

export const useTasks = (enabled: boolean) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getTasks = async (filters: TaskFilters = {}) => {
    if (!enabled) return;
    setLoading(true);
    try {
      const params: Record<string, string | number> = {};
      if (filters.status && filters.status !== 'ALL') params.status = filters.status;
      if (filters.priority && filters.priority !== 'ALL') params.priority = filters.priority;
      params.page = filters.page ?? 1;
      params.limit = filters.limit ?? 10;

      const res = await getTasksApi(params);
      let nextTasks = res.data.data.tasks as Task[];
      if (filters.search) {
        const keyword = filters.search.toLowerCase();
        nextTasks = nextTasks.filter((task) => task.title.toLowerCase().includes(keyword));
      }
      setTasks(nextTasks);
      setTotal(res.data.data.total);
      setPage(res.data.data.page);
      setTotalPages(res.data.data.totalPages);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (payload: TaskPayload) => {
    setMutationLoading(true);
    try {
      await createTaskApi(payload);
      toast.success('Task created successfully');
      await getTasks({ page });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create task');
      throw error;
    } finally {
      setMutationLoading(false);
    }
  };

  const updateTask = async (id: string, payload: TaskPayload) => {
    setMutationLoading(true);
    try {
      await updateTaskApi(id, payload);
      toast.success('Task updated successfully');
      await getTasks({ page });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update task');
      throw error;
    } finally {
      setMutationLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setMutationLoading(true);
    try {
      await deleteTaskApi(id);
      toast.success('Task deleted successfully');
      await getTasks({ page });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to delete task');
      throw error;
    } finally {
      setMutationLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      void getTasks();
    }
  }, [enabled]);

  return {
    tasks,
    loading,
    mutationLoading,
    total,
    page,
    totalPages,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
