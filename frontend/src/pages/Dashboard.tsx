import { useEffect, useMemo, useState } from 'react';
import { getUsersApi } from '../api/task.api';
import toast from 'react-hot-toast';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import TaskModal from '../components/TaskModal';
import { useAuth } from '../hooks/useAuth';
import { Task, TaskPriority, TaskStatus, useTasks } from '../hooks/useTasks';

const statusColors: Record<TaskStatus, string> = {
  PENDING: 'bg-[#FFD84D] text-black',
  IN_PROGRESS: 'bg-[#2EC4B6] text-black',
  COMPLETED: 'bg-[#C7F464] text-black',
};

const priorityColors: Record<TaskPriority, string> = {
  LOW: 'bg-[#C7F464] text-black',
  MEDIUM: 'bg-[#FFD84D] text-black',
  HIGH: 'bg-[#FF6B6B] text-black',
};

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { tasks, loading, mutationLoading, total, getTasks, createTask, updateTask, deleteTask } = useTasks(isAuthenticated);

  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'ALL'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [users, setUsers] = useState<Array<{ id: string; name: string; email: string; role: string }>>([]);
  const [activeTab, setActiveTab] = useState<'TASKS' | 'USERS'>('TASKS');

  useEffect(() => {
    void getTasks({ status: statusFilter, priority: priorityFilter, search, page: 1, limit: 12 });
  }, [statusFilter, priorityFilter, search]);

  useEffect(() => {
    const loadUsers = async () => {
      if (user?.role !== 'ADMIN') return;
      try {
        const res = await getUsersApi();
        setUsers(res.data.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to fetch users');
      }
    };
    void loadUsers();
  }, [user?.role]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'COMPLETED').length;
    const pending = tasks.filter((task) => task.status === 'PENDING').length;
    const inProgress = tasks.filter((task) => task.status === 'IN_PROGRESS').length;
    return { completed, pending, inProgress };
  }, [tasks]);

  if (isLoading) return <div className="p-6">Loading session...</div>;
  if (!isAuthenticated) return <div className="p-6">Please login to continue.</div>;

  return (
    <div className="min-h-screen bg-[#FAFAF5] p-3 sm:p-4 md:p-8 text-[#1A1A1A]">
      <div className="neo-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-space text-3xl font-extrabold">TASK MANAGER</h1>
          <div className="flex items-center gap-3">
            <span className="font-semibold">{user?.name}</span>
            <span className={`sticker ${user?.role === 'ADMIN' ? 'bg-[#FF6B6B] text-black' : 'bg-[#2EC4B6] text-black'}`}>
              {user?.role}
            </span>
          </div>
          <button onClick={logout} className="neo-btn bg-[#FF6B6B] px-3 py-2 text-black">Logout</button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Tasks" value={total} color="border-[#00C896]" />
        <StatCard label="Completed" value={stats.completed} color="border-green-500" />
        <StatCard label="Pending" value={stats.pending} color="border-yellow-500" />
        <StatCard label="In Progress" value={stats.inProgress} color="border-blue-500" />
      </div>

      <div className="neo-card mt-4 p-3 sm:p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {(['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`neo-btn px-3 py-1 text-sm ${statusFilter === status ? 'bg-[#2EC4B6] text-black' : 'bg-white text-black'}`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'ALL')} className="neo-input px-3 py-2 text-sm">
            <option value="ALL">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title" className="neo-input w-full min-w-0 flex-1 px-3 py-2 text-sm sm:min-w-[220px]" />
          <button
            onClick={() => {
              setEditingTask(null);
              setShowTaskModal(true);
            }}
            className="neo-btn bg-[#2EC4B6] px-4 py-2 text-sm text-black"
          >
            ADD TASK
          </button>
        </div>
      </div>

      {user?.role === 'ADMIN' && (
        <div className="mt-4 flex gap-2">
          <button onClick={() => setActiveTab('TASKS')} className={`neo-btn px-3 py-2 text-sm ${activeTab === 'TASKS' ? 'bg-[#2EC4B6] text-black' : 'bg-white'}`}>TASKS</button>
          <button onClick={() => setActiveTab('USERS')} className={`neo-btn px-3 py-2 text-sm ${activeTab === 'USERS' ? 'bg-[#2EC4B6] text-black' : 'bg-white'}`}>USER MANAGEMENT</button>
        </div>
      )}

      {(activeTab === 'TASKS' || user?.role !== 'ADMIN') && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border bg-white p-4 shadow-sm">
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="mt-3 h-3 w-full rounded bg-gray-100" />
                <div className="mt-2 h-3 w-4/5 rounded bg-gray-100" />
                <div className="mt-4 h-6 w-1/3 rounded bg-gray-100" />
              </div>
            ))
          ) : tasks.map((task) => (
            <div key={task.id} className="neo-card p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold">{task.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingTask(task); setShowTaskModal(true); }} className="neo-btn bg-[#2EC4B6] px-2 py-1 text-xs">Edit</button>
                  <button onClick={() => { setDeletingTaskId(task.id); setShowDeleteModal(true); }} className="neo-btn bg-[#FF6B6B] px-2 py-1 text-xs">Delete</button>
                </div>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{task.description || 'No description'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={`sticker ${priorityColors[task.priority]}`}>{task.priority}</span>
                <span className={`sticker ${statusColors[task.status]}`}>{task.status.replace('_', ' ')}</span>
              </div>
              {user?.role === 'ADMIN' && task.user && <p className="mt-2 text-xs text-gray-500">Owner: {task.user.name} ({task.user.email})</p>}
              <p className="mt-2 text-xs text-gray-500">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'USERS' && user?.role === 'ADMIN' && (
        <div className="neo-card mt-4 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TaskModal
        isOpen={showTaskModal}
        mode={editingTask ? 'edit' : 'create'}
        task={editingTask}
        isSubmitting={mutationLoading}
        onClose={() => setShowTaskModal(false)}
        onSubmit={async (data) => {
          if (editingTask) {
            await updateTask(editingTask.id, data);
          } else {
            await createTask(data);
          }
          setShowTaskModal(false);
        }}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        isDeleting={mutationLoading}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          if (!deletingTaskId) return;
          await deleteTask(deletingTaskId);
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className={`neo-card border-l-[10px] ${color} p-4`}>
    <p className="font-space text-4xl font-extrabold">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default Dashboard;
