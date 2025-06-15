const express = require('express');
const router = express.Router();

const { verifyJWT, authorizeRoles } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const { markLessonCompleteSchema } = require('../validators/progressValidator');

const {
  markLessonComplete,
  getLessonProgressByStudent,
  getCourseProgress,
  resetLessonProgress,
} = require('../controllers/progressController');

// POST /api/progress/complete/:lessonId — mark as completed
router.post(
  '/complete/:lessonId',
  verifyJWT,
  authorizeRoles('student'),
  validateRequest(markLessonCompleteSchema),
  markLessonComplete
);

// GET /api/progress/lesson/:lessonId — get lesson progress
router.get(
  '/lesson/:lessonId',
  verifyJWT,
  authorizeRoles('student'),
  getLessonProgressByStudent
);

// GET /api/progress/course/:courseId — overall course progress
router.get(
  '/course/:courseId',
  verifyJWT,
  authorizeRoles('student'),
  getCourseProgress
);

// DELETE /api/progress/reset/:lessonId — for resetting progress (optional utility)
router.delete(
  '/reset/:lessonId',
  verifyJWT,
  authorizeRoles('student'),
  resetLessonProgress
);

module.exports = router;
