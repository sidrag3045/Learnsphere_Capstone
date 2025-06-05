const { Course, User } = require('../models');

const createCourseService = async (data, instructorId) => {
  await User.findByPk(instructorId);
  if (!instructorId) throw new Error('Instructor not found');
  
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

  const course = await Course.findByPk(id, {
    include: {
      model: User,
      as: 'instructor',
      attributes: ['id', 'fullName', 'email']
    }
  });

  if (!course) throw new Error('Course not found');
  return course;
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

const updateCourseService = async (id, updatedData) => {
  
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');

  Object.assign(course, updatedData);
  await course.save();

  return course;
};

const deleteCourseService = async (id) => {
  
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');

  await course.destroy();
  return course;
};


module.exports = {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
  getCoursesByInstructorService
};