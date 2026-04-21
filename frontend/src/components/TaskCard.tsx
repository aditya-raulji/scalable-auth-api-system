import { Task } from '../hooks/useTasks';

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm border">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-slate-600">{task.description || 'No description'}</p>
    </div>
  );
};

export default TaskCard;
