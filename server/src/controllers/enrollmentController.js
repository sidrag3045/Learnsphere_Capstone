const { enrollInCourseService,
    getUserEnrollmentsService,
    getEnrolledStudentsForCourseService,
    checkEnrollmentStatusService } = require('../services/enrollmentService');

const enrollInCourse = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const enrollment = await enrollInCourseService(userId, courseId);
    return res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (err) {
    next(err);
  }
};

const getUserEnrollments = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const enrollments = await getUserEnrollmentsService(userId);
    return res.status(200).json({ enrollments });
  } catch (err) {
    next(err);
  }
};

const getEnrolledStudentsForCourse = async (req, res, next) => {
  try {
    const instructorId = req.user.id;
    const { courseId } = req.params;
    const students = await getEnrolledStudentsForCourseService(instructorId, courseId);
    return res.status(200).json({ students });
  } catch (err) {
    next(err);
  }
};

const checkEnrollmentStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const isEnrolled = await checkEnrollmentStatusService(userId, courseId);
    return res.status(200).json({ enrolled: isEnrolled });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  enrollInCourse,
  getUserEnrollments,
  getEnrolledStudentsForCourse,
  checkEnrollmentStatus
};