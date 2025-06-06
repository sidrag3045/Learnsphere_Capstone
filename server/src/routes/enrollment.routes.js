const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT');
const authorizeRole = require('../middlewares/authorizeRole');

const { enrollInCourse,
        getUserEnrollments,
        getEnrolledStudentsForCourse,
        checkEnrollmentStatus } = require('../controllers/enrollmentController');


// Enrollment routes

// Student enrolls in a course
// POST api/enrollments/:courseId/enroll
router.post('/:courseId/enroll', verifyJWT,enrollInCourse);

// Student fetches all enrolled courses
// GET api/enrollments
router.get('/', verifyJWT, getUserEnrollments);

// Instructor views all enrolled students in their own course
// GET api/enrollments/course/:courseId/students
router.get('/course/:courseId/students', verifyJWT, authorizeRole(['instructor']), getEnrolledStudentsForCourse);

// Student checks if they are enrolled in a specific course
// GET api/enrollments/:courseId/status
router.get('/:courseId/status', verifyJWT, checkEnrollmentStatus);

module.exports = router;
