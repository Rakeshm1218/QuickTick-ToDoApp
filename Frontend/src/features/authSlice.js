import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getCurrentUser as getCurrentUserService, logout as logoutService } from '../services/authService';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    }
  }
});

export const { setUser, setAuthError, logout, setLoading } = authSlice.actions;

export const checkAuth = (navigate) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const user = await getCurrentUserService();
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setAuthError('No user found'));
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
    }
  } catch (err) {
    dispatch(setAuthError(err.message));
    if (window.location.pathname !== '/login') {
      navigate('/login');
    }
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const user = await getCurrentUserService();  // Updated
    dispatch(setUser(user));
  } catch (err) {
    dispatch(setAuthError(err.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await logoutService();  // Updated
    dispatch(logout());
    toast.success('Logged out successfully');
  } catch (err) {
    dispatch(setAuthError(err.message));
    toast.error('Failed to logout');
  }
};

export default authSlice.reducer;