import axiosInstance from './axiosInstance';

// Create a new module in a course
export const createModule = async (courseId, payload) => {
  const res = await axiosInstance.post(`/modules/courses/${courseId}`, payload);
  return res.data;
};

// Get all modules for a course
export const getModulesByCourse = async (courseId) => {
  const res = await axiosInstance.get(`/modules/courses/${courseId}`);
  return res.data;
};

// Get a single module by ID
export const getModuleById = async (moduleId) => {
  const res = await axiosInstance.get(`/modules/${moduleId}`);
  return res.data;
};

// Update a module
export const updateModule = async (moduleId, payload) => {
  const res = await axiosInstance.put(`/modules/${moduleId}`, payload);
  return res.data;
};

// Delete a module
export const deleteModule = async (moduleId) => {
  const res = await axiosInstance.delete(`/modules/${moduleId}`);
  return res.data;
};

// Reorder modules within a course
export const reorderModules = async (courseId, modules) => {
  const res = await axiosInstance.patch(`/modules/courses/${courseId}/reorder`, { modules });
  return res.data;
};

// Update module status
export const updateModuleStatus = async (moduleId, status) => {
  const res = await axiosInstance.patch(`/modules/${moduleId}/status`, { status });
  return res.data;
};
