import axiosInstance from './axiosInstance';

// Create a lesson under a module
export const createLesson = async (moduleId, payload) => {
  const res = await axiosInstance.post(`/lessons/modules/${moduleId}`, payload);
  return res.data;
};

// Get all lessons for a module
export const getLessonsByModule = async (moduleId) => {
  const res = await axiosInstance.get(`/lessons/modules/${moduleId}`);
  return res.data.lessons; 
};

// Get a lesson by ID
export const getLessonById = async (lessonId) => {
  const res = await axiosInstance.get(`/lessons/${lessonId}`);
  return res.data;
};

// Update a lesson
export const updateLesson = async (lessonId, payload) => {
  const res = await axiosInstance.put(`/lessons/${lessonId}`, payload);
  return res.data;
};

// Delete a lesson
export const deleteLesson = async (lessonId) => {
  const res = await axiosInstance.delete(`/lessons/${lessonId}`);
  return res.data;
};

// Reorder lessons in a module
export const reorderLessons = async (moduleId, lessons) => {
  const res = await axiosInstance.patch(`/lessons/modules/${moduleId}/reorder`, { lessons });
  return res.data;
};

// Update lesson status
export const updateLessonStatus = async (lessonId, status) => {
  const res = await axiosInstance.patch(`/lessons/${lessonId}/status`, { status });
  return res.data;
};

// Get secure content for a lesson
export const getLessonContent = async (lessonId) => {
  const res = await axiosInstance.get(`/lessons/${lessonId}/content`);
  return res.data;
};

// Generate signed upload URL for lesson content
export const generateLessonUploadUrl = async (lessonId, payload) => {
  const res = await axiosInstance.post(`/lessons/${lessonId}/upload-url`, payload);
  return res.data;
};
