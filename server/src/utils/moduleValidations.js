const { Module } = require('../models');

const hasDuplicates = (arr) => new Set(arr).size !== arr.length;

const validateModuleIdsBelongToCourse = async (courseId, moduleIds) => {
  const existingModules = await Module.findAll({
    where: { courseId },
    attributes: ['id']
  });

  const validIds = new Set(existingModules.map(m => m.id));
  return moduleIds.every(id => validIds.has(id));
};

module.exports = {
  hasDuplicates,
  validateModuleIdsBelongToCourse
};