
import instance from "../utils/axiosConfig";


export const getCurrentUser = async () => {
  const response = await instance.get('/api/auth/current-user',{
    withCredentials: true
  });
  return response.data;
};

export const logout = async () => {
  await instance.get('/api/auth/logout');
};