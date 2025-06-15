// src/services/enrollment.js
import axios from './axiosInstance';

// POST: Student enrolls in a course
// Route: /api/enrollments/:courseId/enroll
const enrollInCourse = async (courseId) => {
  const response = await axios.post(`/enrollments/${courseId}/enroll`);
  return response.data;
};

// GET: Student fetches all enrolled courses
// Route: /api/enrollments
const getMyEnrollments = async () => {
  const response = await axios.get('/enrollments');
  return response.data.enrollments;
};

// GET: Instructor views enrolled students in a specific course
// Route: /api/enrollments/course/:courseId/students
const getStudentsByCourse = async (courseId) => {
  const response = await axios.get(`/enrollments/course/${courseId}/students`);
  return response.data.students;
};

// GET: Student checks if they are enrolled in a specific course
// Route: /api/enrollments/:courseId/status
const checkEnrollmentStatus = async (courseId) => {
  const response = await axios.get(`/enrollments/${courseId}/status`);
  return response.data.enrolled;
};

export {
  enrollInCourse,
  getMyEnrollments,
  getStudentsByCourse,
  checkEnrollmentStatus
};