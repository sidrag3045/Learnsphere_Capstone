const express = require('express');
const router = express.Router();

const { verifyJWT, authorizeRoles } = require('../middlewares/authMiddleware');

const { createLesson, 
        getLessonById, 
        getLessonsByModuleId,
        updateLesson, 
        deleteLesson,
        reorderLessons,
        updateLessonStatus } = require('../controllers/lessonController');

const { validateRequest } = require('../middlewares/validateRequest');
const { lessonSchema, reorderLessonsSchema, updateLessonStatusSchema } = require('../validators/lessonValidator');        

// Lesson routes

// POST /api/lessons/modules/:moduleId - Create a new lesson in a module
router.post(
  '/modules/:moduleId',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(lessonSchema),
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
  validateRequest(lessonSchema),
  updateLesson
);

// DELETE /api/lessons/:id - Delete a lesson by ID
router.delete(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  deleteLesson
);

// PATCH /api/lessons/modules/:moduleId/reorder - Reorder lessons in a module
router.patch(
  '/modules/:moduleId/reorder',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(reorderLessonsSchema),
  reorderLessons
);

// PATCH /api/lessons/:id/status - Update lesson status
router.patch(
  '/:id/status',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(updateLessonStatusSchema),
  updateLessonStatus
);

module.exports = router;
