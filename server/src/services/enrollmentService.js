const { Enrollment, Course, User } = require('../models');

const enrollInCourseService = async (userId, courseId) => {
  const course = await Course.findByPk(courseId);
  if (!course) throw new Error('Course not found');

  const existing = await Enrollment.findOne({ where: { userId, courseId } });
  if (existing) throw new Error('Already enrolled');

  return await Enrollment.create({ userId, courseId });
};

const getUserEnrollmentsService = async (userId) => {
  return await Enrollment.findAll({
    where: { userId },
    include: {
      model: Course,
      as: 'course',
      attributes: ['id', 'title', 'thumbnailUrl', 'createdBy']
    }
  });
};

const getEnrolledStudentsForCourseService = async (instructorId, courseId) => {
  const course = await Course.findOne({
    where: { id: courseId, createdBy: instructorId }
  });
  if (!course) throw new Error('Unauthorized or course not found');

  return await Enrollment.findAll({
    where: { courseId },
    include: {
      model: User,
      as: 'student',
      attributes: ['id', 'name', 'email']
    }
  });
};

const checkEnrollmentStatusService = async (userId, courseId) => {
  const enrollment = await Enrollment.findOne({ where: { userId, courseId } });

  // truthy check for enrollment
  return !!enrollment; 
};

module.exports = {
  enrollInCourseService,
  getUserEnrollmentsService,
  getEnrolledStudentsForCourseService,
  checkEnrollmentStatusService
};
