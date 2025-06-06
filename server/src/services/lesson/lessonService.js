const { Lesson, Module } = require('../../models');
const { verifyModuleOwnership } = require('../../utils/resourceAuthorisation');

const {
  hasDuplicates,
  validateLessonIdsBelongToModule
} = require('../../utils/lessonServiceValidations');

const createLessonService = async (moduleId, data, userId) => {

  await verifyModuleOwnership(moduleId, userId);
  return await Lesson.create({ ...data, moduleId });
};

const getLessonByIdService = async (id) => {

  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new Error('Lesson not found');
  return lesson;
};

const getLessonsByModuleIdService = async (moduleId) => {

  const module = await Module.findByPk(moduleId);
  if (!module) throw new Error('Module not found');
  
  return await Lesson.findAll({ where: { moduleId } });
};

const updateLessonService = async (id, data, userId) => {

  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new Error('Lesson not found');

  await verifyModuleOwnership(lesson.moduleId, userId);

  Object.assign(lesson, data);
  await lesson.save();

  return lesson;
};

const deleteLessonService = async (id, userId) => {

  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new Error('Lesson not found');

  await verifyModuleOwnership(lesson.moduleId, userId);

  await lesson.destroy();

  return lesson;
};

const reorderLessonsService = async (instructorId, moduleId, lessons) => {

  await verifyModuleOwnership(moduleId, instructorId);

  const lessonIds = lessons.map(l => l.id);
  const orderValues = lessons.map(l => l.order);

  if (hasDuplicates(lessonIds) || hasDuplicates(orderValues)) {
    throw new Error('Duplicate lesson IDs or order values found');
  }

  const allValid = await validateLessonIdsBelongToModule(moduleId, lessonIds);
  if (!allValid) {
    throw new Error('One or more lessons do not belong to this module');
  }

  await Promise.all(
    lessons.map(({ id, order }) =>
      Lesson.update({ order }, { where: { id } })
    )
  );

  return { message: 'Lessons reordered successfully' };
};

const updateLessonStatusService = async (id, status) => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new Error('Lesson not found');

  lesson.status = status;
  await lesson.save();

  return lesson;
};

module.exports = {
  createLessonService,
  getLessonByIdService,
  getLessonsByModuleIdService,
  updateLessonService,
  deleteLessonService,
  reorderLessonsService,
  updateLessonStatusService
};
