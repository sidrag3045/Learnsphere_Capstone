const { Module, Course } = require('../models');
const { verifyCourseOwnership } = require('../utils/resourceAuthorisation');

// Utility functions for module validations
const {
  hasDuplicates,
  validateModuleIdsBelongToCourse
} = require('../utils/moduleServiceValidations');

const createModuleService = async (data, courseId) => {
  return await Module.create({ ...data, courseId });
};

const getModulesByCourseService = async (courseId) => {

  await Course.findByPk(courseId);
  if (!courseId) throw new Error('Course not found');

  return await Module.findAll({
    where: { courseId },
    order: [['createdAt', 'ASC']]
  });
};

const getModuleByIdService = async (id) => {
  
  return await Module.findByPk(id, {
    include: {
      model: Course,
      as: 'course',
      attributes: ['id', 'title']
    }
  });
};

const updateModuleService = async (id, updateData) => {

  const module = await Module.findByPk(id);
  if (!module) throw new Error('Module not found');

  Object.assign(module, updateData);
  await module.save();

  return module;
};

const deleteModuleService = async (id) => {

  const module = await Module.findByPk(id);
  if (!module) throw new Error('Module not found');

  await module.destroy();
  return module;
};

const reorderModulesService = async (instructorId, courseId, modules) => {
  
  // To verify course ownership
  await verifyCourseOwnership(courseId, instructorId);

  const moduleIds = modules.map(m => m.id);
  const orderValues = modules.map(m => m.order);

  // Validating duplicates
  if (hasDuplicates(moduleIds) || hasDuplicates(orderValues)) {
    throw new Error('Duplicate module IDs or order values found');
  }

  // To verify all modules belong to the course
  const allValid = await validateModuleIdsBelongToCourse(courseId, moduleIds);
  if (!allValid) {
    throw new Error('One or more modules do not belong to the course');
  }

  // Updating order of modules
  await Promise.all(
    modules.map(({ id, order }) =>
      Module.update({ order }, { where: { id } })
    )
  );

  return { message: 'Modules reordered successfully' };
};

const updateModuleStatusService = async (id, status) => {
  const module = await Module.findByPk(id);
  if (!module) throw new Error('Module not found');

  module.status = status;
  await module.save();
};


module.exports = {
  createModuleService,
  getModulesByCourseService,
  getModuleByIdService,
  updateModuleService,
  deleteModuleService,
  updateModuleStatusService,
  reorderModulesService
};
