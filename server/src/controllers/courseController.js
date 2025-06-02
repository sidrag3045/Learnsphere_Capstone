const { createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService
 } = require('../services/courseService');

const createCourse = async (req, res) => {
  try {
    const course = await createCourseService(req.body, req.user.id);
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await getAllCoursesService();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await getCourseByIdService(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCourse = async (req, res) => {
  try {
    await updateCourseService(req.params.id, req.body);
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    await deleteCourseService(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};