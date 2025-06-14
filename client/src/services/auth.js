import axiosInstance from './axiosInstance';

export const loginUser = async (payload) => {
  const res = await axiosInstance.post('/auth/login', payload);
  return res.data;
};

export const registerUser = async (payload) => {
  const res = await axiosInstance.post('/auth/register', payload);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get('/auth/me', {
    withCredentials: true, // Ensure cookies are sent with the request
  });
  return res.data.user;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post('/auth/logout', {
    withCredentials: true,
  });
  return res.data.user;
};
