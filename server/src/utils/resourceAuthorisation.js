const { Course, Module } = require('../models');

/**
 * Verifies if the course belongs to the logged-in instructor
 */
exports.verifyCourseOwnership = async (courseId, userId) => {
  const course = await Course.findByPk(courseId);

  if (!course) {
    throw new Error('Course not found');
  }

  if (course.createdBy !== userId) {
    throw new Error('Unauthorized: You do not own this course');
  }

  return course; // optionally return the course if needed
};

/**
 * Verifies if the module belongs to a course owned by the instructor
 */
exports.verifyModuleOwnership = async (moduleId, userId) => {
  const module = await Module.findByPk(moduleId);

  if (!module) {
    throw new Error('Module not found');
  }

  // Delegate to course ownership
  return await exports.verifyCourseOwnership(module.courseId, userId);
};

