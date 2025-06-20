const express = require('express');
const router = express.Router();
const { validateRequest } = require('../middlewares/validateRequest');
const { courseSchema, updateCourseStatusSchema, generateThumbnailUploadSchema } = require('../validators/courseValidator');

const { createCourse, 
        getAllCourses, 
        getCourseById, 
        updateCourse, 
        deleteCourse,
        getCoursesByInstructor,
        getCoursesByInstructorSelf,
        updateCourseStatus,
        generateThumbnailUploadUrl } = require('../controllers/courseController');

const { verifyJWT, authorizeRoles } = require('../middlewares/authMiddleware');

// Course routes

// POST /api/courses - Create a new course
router.post(
  '/',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(courseSchema),
  createCourse
);

// GET /api/courses - Get all courses
router.get('/', verifyJWT, getAllCourses);

// GET /api/courses/my - Get courses for instructor created by himself 
router.get(
  '/my',
  verifyJWT,
  authorizeRoles('instructor'),
  getCoursesByInstructorSelf
);
// also note to make further routes for the my route to add further functionality such as CRUD operations for the instructor's own courses, and any other operations that might be needed for the instructor's courses.

// GET /api/courses/:id - Get a course by ID
router.get('/:id', verifyJWT, getCourseById);

// PUT /api/courses/:id - Update a course by ID
router.put(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(courseSchema),
  updateCourse
);

// DELETE /api/courses/:id - Delete a course by ID
router.delete(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  deleteCourse
);

// GET /api/courses/instructor/:instructorId - Get courses by instructor ID
router.get(
  '/instructor/:instructorId',
  verifyJWT,
  getCoursesByInstructor
);

// PATCH /api/courses/:id/status - Update the status of a course
router.patch(
  '/:id/status',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(updateCourseStatusSchema),
  updateCourseStatus
);

// PUT /api/courses/:id/thumbnail - Generate S3 upload URL for course thumbnail
router.put(
  '/:id/thumbnail',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(generateThumbnailUploadSchema),
  generateThumbnailUploadUrl
);
// Additional routes can be added here as needed
// (e.g., search, sort, filter, etc.)

module.exports = router;
