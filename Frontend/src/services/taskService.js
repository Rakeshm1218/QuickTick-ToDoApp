import instance from "../utils/axiosConfig";


export const getAllTasks = async () => {
  const response = await instance.get('/api/tasks');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await instance.post('/api/tasks', taskData);
  return response.data;
};

// taskService.js
export const updateTask = async (id, taskData) => {
  const response = await instance.put(`/api/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  await instance.delete(`/api/tasks/${id}`);
};