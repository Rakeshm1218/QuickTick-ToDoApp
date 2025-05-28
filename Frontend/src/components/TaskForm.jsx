import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createTask } from '../features/tasksSlice';

const TaskForm = ({onCancel}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const { title, description, dueDate } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    dispatch(createTask({ title, description, dueDate }));
    setFormData({
      title: '',
      description: '',
      dueDate: ''
    });
    onCancel();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-4 text-[#27c6d9]">Create New Task</h2>
        <button 
          onClick={onCancel}
          className="text-xl font-semibold mb-4 text-[#27c6d9] cursor-pointer"
        >
          Cancel
        </button>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="title">
            Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-[#27c6d9]"
            required
            placeholder="Enter task title"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            rows="3"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-[#27c6d9]"
            placeholder="Enter description (optional)"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-[#27c6d9]"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#27c6d9] text-black py-2 px-4 rounded hover:bg-[#1fb8cc] transition font-medium"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;