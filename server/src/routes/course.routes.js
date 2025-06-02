const express = require('express');
const router = express.Router();

const { createCourse, 
        getAllCourses, 
        getCourseById, 
        updateCourse, 
        deleteCourse } = require('../controllers/courseController');

const { verifyJWT, authorizeRoles } = require('../middlewares/authMiddleware');

// Course routes

// POST /api/courses - Create a new course
router.post(
  '/',
  verifyJWT,
  authorizeRoles('instructor'),
  createCourse
);

// GET /api/courses - Get all courses
router.get('/', verifyJWT, getAllCourses);

// GET /api/courses/:id - Get a course by ID
router.get('/:id', verifyJWT, getCourseById);

// PUT /api/courses/:id - Update a course by ID
router.put(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  updateCourse
);

// DELETE /api/courses/:id - Delete a course by ID
router.delete(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  deleteCourse
);

module.exports = router;
