const { Course, User } = require('../models');

const createCourseService = async (data, instructorId) => {
  return await Course.create({ ...data, createdBy: instructorId });
};

const getAllCoursesService = async () => {
  return await Course.findAll({
    include: {
      model: User,
      as: 'instructor',
      attributes: ['id', 'fullName', 'email']
    },
    order: [['createdAt', 'DESC']]
  });
};

const getCourseByIdService = async (id) => {
  return await Course.findByPk(id, {
    include: {
      model: User,
      as: 'instructor',
      attributes: ['id', 'fullName', 'email']
    }
  });
};

const updateCourseService = async (id, updatedData) => {
  return await Course.update(updatedData, { where: { id } });
};

const deleteCourseService = async (id) => {
  return await Course.destroy({ where: { id } });
};

const getCoursesByInstructorService = async (instructorId) => {
  return await Course.findAll({
    where: { createdBy: instructorId },
    include: {
      model: User,
      as: 'instructor',
      attributes: ['id', 'fullName', 'email']
    },
    order: [['createdAt', 'DESC']]
  });
};


module.exports = {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
  getCoursesByInstructorService
};