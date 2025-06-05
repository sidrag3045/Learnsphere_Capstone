const express = require('express');
const router = express.Router();
const { createModule,
        getModulesByCourse,
        getModuleById,
        updateModule,
        deleteModule,
        reorderModules,
        updateModuleStatus } = require('../controllers/moduleController');
        
const { verifyJWT, authorizeRoles } = require('../middlewares/authMiddleware');

const { validateRequest } = require('../middlewares/validateRequest');
const { moduleSchema, reorderModulesSchema, updateModuleStatusSchema } = require('../validators/moduleValidator');

// Module Routes

// POST /api/modules/:courseId - Create a new module for a course
router.post(
  '/courses/:courseId',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(moduleSchema),
  createModule
);

// GET /api/modules/course/:courseId - Get all modules for a course
router.get('/courses/:courseId', getModulesByCourse);

// GET /api/modules/:id - Get a module by ID
router.get('/:id', getModuleById);

// PUT /api/modules/:id - Update a module by ID
router.put(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(moduleSchema),
  updateModule
);

// DELETE /api/modules/:id - Delete a module by ID
router.delete(
  '/:id',
  verifyJWT,
  authorizeRoles('instructor'),
  deleteModule
);

// PATCH /api/modules/courses/:courseId/reorder - Reorder modules in a course
router.patch(
  '/courses/:courseId/reorder',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(reorderModulesSchema),
  reorderModules
);

// PATCH /api/modules/:id/status - Update the status of a module
router.patch(
  '/:id/status',
  verifyJWT,
  authorizeRoles('instructor'),
  validateRequest(updateModuleStatusSchema),
  updateModuleStatus
);

module.exports = router;
