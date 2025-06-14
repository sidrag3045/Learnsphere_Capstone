import axiosInstance from './axiosInstance';

export const getAllCourses = async () => {
  const res = await axiosInstance.get('/courses');
  return res.data;
};
