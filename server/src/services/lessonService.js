const { Lesson, Module } = require('../models');
const { verifyModuleOwnership } = require('../utils/authorization');

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


module.exports = {
  createLessonService,
  getLessonByIdService,
  getLessonsByModuleIdService,
  updateLessonService,
  deleteLessonService
};
