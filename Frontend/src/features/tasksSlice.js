import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllTasks as getAllTasksService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../services/taskService";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
      state.loading = false;
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        // Create a new array with the updated task
        state.tasks = [
          ...state.tasks.slice(0, index),
          action.payload,
          ...state.tasks.slice(index + 1),
        ];
      }
      state.loading = false;
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: () => initialState,
  },
});

export const {
  setTasks,
  addTask,
  editTask,
  removeTask,
  setLoading,
  setError,
  reset,
} = tasksSlice.actions;

export const getAllTasks = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const tasks = await getAllTasksService(); // Updated
    dispatch(setTasks(tasks));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to fetch tasks");
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const task = await createTaskService(taskData); // Updated
    dispatch(addTask(task));
    toast.success("Task created successfully");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to create task");
  }
};

// tasksSlice.js
export const updateTask = (taskData) => async (dispatch) => {
  try {
    if (!taskData.id) {
      throw new Error('Task ID is required');
    }
    
    dispatch(setLoading());
    const task = await updateTaskService(taskData.id, taskData);
    dispatch(editTask(task));
    toast.success('Task updated successfully');
    return task;
  } catch (err) {
    dispatch(setError(err.message));
    toast.error(err.message || 'Failed to update task');
    throw err;
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await deleteTaskService(taskId); // Updated
    dispatch(removeTask(taskId));
    toast.success("Task deleted successfully");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to delete task");
  }
};

export default tasksSlice.reducer;
