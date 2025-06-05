const { Lesson } = require('../models');

const hasDuplicates = (arr) => new Set(arr).size !== arr.length;

const validateLessonIdsBelongToModule = async (moduleId, lessonIds) => {
  const existingLessons = await Lesson.findAll({
    where: { moduleId },
    attributes: ['id']
  });

  const validIds = new Set(existingLessons.map(l => l.id));
  return lessonIds.every(id => validIds.has(id));
};

module.exports = {
  hasDuplicates,
  validateLessonIdsBelongToModule
};