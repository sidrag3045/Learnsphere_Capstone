const express = require('express');
const router = express.Router();

const { verifyJWT, authorizeRoles } = require('../middlewares/authMiddleware');

const { createLesson, 
        getLessonById, 
        getLessonsByModuleId,
        updateLesson, 
        deleteLesson } = require('../controllers/lessonController');


// Lesson routes

// POST /api/lessons/modules/:moduleId - Create a new lesson in a module
router.post(
  '/modules/:moduleId',
  verifyJWT,
  authorizeRoles('instructor'),
  createLesson
);

// GET /api/lessons/modules/:moduleId - Get all lessons in a module
router.get(
  '/modules/:moduleId',
  verifyJWT,
  getLessonsByModuleId
);

// GET /api/lessons/:id - Get a lesson by ID
router.get(
    '/:id', 
    verifyJWT, 
    getLessonById
);

// PUT /api/lessons/:id - Update a lesson by ID
router.put(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  updateLesson
);

// DELETE /api/lessons/:id - Delete a lesson by ID
router.delete(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  deleteLesson
);

module.exports = router;
