import axiosInstance from './axiosInstance';

// 1. Create a new course (POST /api/courses)
export const createCourse = async (courseData) => {
  const res = await axiosInstance.post('/courses', courseData);
  return res.data;
};

// 2. Get all courses (GET /api/courses)
export const getAllCourses = async () => {
  const res = await axiosInstance.get('/courses');
  return res.data;
};

// 3. Get current instructor's own courses (GET /api/courses/my)
export const getMyCourses = async () => {
  const res = await axiosInstance.get('/courses/my');
  return res.data;
};

// 4. Get a course by ID (GET /api/courses/:id)
export const getCourseById = async (id) => {
  const res = await axiosInstance.get(`/courses/${id}`);
  return res.data;
};

// 5. Update a course by ID (PUT /api/courses/:id)
export const updateCourse = async (id, courseData) => {
  const res = await axiosInstance.put(`/courses/${id}`, courseData);
  return res.data;
};

// 6. Delete a course by ID (DELETE /api/courses/:id)
export const deleteCourse = async (id) => {
  const res = await axiosInstance.delete(`/courses/${id}`);
  return res.data;
};

// 7. Get courses by any instructor (GET /api/courses/instructor/:instructorId)
export const getCoursesByInstructor = async (instructorId) => {
  const res = await axiosInstance.get(`/courses/instructor/${instructorId}`);
  return res.data;
};

// 8. Update course status (PATCH /api/courses/:id/status)
export const updateCourseStatus = async (id, status) => {
  const res = await axiosInstance.patch(`/courses/${id}/status`, { status });
  return res.data;
};

// 9. Generate thumbnail upload URL (PUT /api/courses/:id/thumbnail)
export const generateThumbnailUploadUrl = async (id, extension) => {
  const res = await axiosInstance.put(`/courses/${id}/thumbnail`, { extension });
  return res.data;
};
