import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks, reset } from '../features/tasksSlice';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { getCurrentUser } from '../features/authSlice';


const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAllTasks());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27c6d9]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#27c6d9]">Welcome, {user?.username}</h1>
        <button
          onClick={() => setShowTaskForm(true)}
          className="bg-[#27c6d9] hover:bg-[#1ea8b8] text-black font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          + Add Task
        </button>
      </div>

      {showTaskForm && (
        <div className="mb-8">
          <TaskForm onCancel={() => setShowTaskForm(false)} />
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-white">Your Tasks</h2>
        {Array.isArray(tasks) && tasks.length === 0 ? (
          <div className="bg-gray-800/50 rounded-lg p-8 text-center">
            <p className="text-gray-400">No tasks found. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(tasks) && tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;