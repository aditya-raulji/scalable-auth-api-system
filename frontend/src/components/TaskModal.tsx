import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Task, TaskPriority, TaskStatus } from '../hooks/useTasks';

interface TaskModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  task?: Task | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    priority: TaskPriority;
    status?: TaskStatus;
  }) => Promise<void>;
}

const dotColor: Record<TaskPriority, string> = {
  LOW: 'bg-green-500',
  MEDIUM: 'bg-yellow-500',
  HIGH: 'bg-red-500',
};

const TaskModal = ({ isOpen, mode, task, isSubmitting = false, onClose, onSubmit }: TaskModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM' as TaskPriority,
      status: 'PENDING' as TaskStatus,
    },
  });

  // Reset form every time modal opens or the task changes
  useEffect(() => {
    if (isOpen) {
      reset({
        title: task?.title || '',
        description: task?.description || '',
        priority: (task?.priority || 'MEDIUM') as TaskPriority,
        status: (task?.status || 'PENDING') as TaskStatus,
      });
    }
  }, [isOpen, task, reset]);

  if (!isOpen) return null;

  const description = watch('description') || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="neo-card w-full max-w-[500px] scale-100 p-6 transition-transform">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-space text-3xl font-extrabold text-[#1A1A1A]">
            {mode === 'create' ? 'Add New Task' : 'Edit Task'}
          </h2>
          <button onClick={onClose} className="text-xl text-gray-500">x</button>
        </div>

        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-4">
          <div>
            <input
              {...register('title', { required: true, minLength: 3 })}
              placeholder="Title"
              className="neo-input w-full px-4 py-3"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-[#FF4D4D]">Title must be at least 3 characters</p>
            )}
          </div>

          <div>
            <textarea
              {...register('description', { maxLength: 500 })}
              rows={3}
              placeholder="Description"
              className="neo-input w-full px-4 py-3"
            />
            <p className="mt-1 text-right text-xs text-gray-500">{description.length}/500</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Priority</label>
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${dotColor[watch('priority') as TaskPriority]}`} />
              <select {...register('priority')} className="neo-input w-full px-4 py-3">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {mode === 'edit' && (
            <div>
              <label className="mb-1 block text-sm font-semibold">Status</label>
              <select {...register('status')} className="neo-input w-full px-4 py-3">
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="neo-btn bg-white px-4 py-2 text-gray-700">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="neo-btn bg-[#2EC4B6] px-4 py-2 font-semibold text-black disabled:opacity-70">
              {isSubmitting ? 'Saving...' : mode === 'create' ? 'CREATE TASK' : 'UPDATE TASK'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
