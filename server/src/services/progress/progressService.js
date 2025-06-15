const { LessonProgress, Lesson, Module, Course, Enrollment } = require('../../models');
const { Op } = require('sequelize');

// MARK as complete
const markLessonAsCompleteService = async (userId, lessonId) => {
  const lesson = await Lesson.findByPk(lessonId, {
    include: {
      model: Module,
      as: 'module',
      include: {
        model: Course,
        as: 'course'
      }
    }
  });

  if (!lesson || !lesson.module || !lesson.module.course) {
    throw new Error('Invalid lesson');
  }

  const enrolled = await Enrollment.findOne({
    where: {
      userId,
      courseId: lesson.module.course.id
    }
  });

  if (!enrolled) throw new Error('You are not enrolled in this course');

  const [progress] = await LessonProgress.findOrCreate({
    where: { userId, lessonId },
    defaults: {
      courseId: lesson.module.course.id,
      moduleId: lesson.module.id,
      status: 'completed',
      progress: 100,
      completedAt: new Date()
    }
  });

  if (progress.status !== 'completed') {
    progress.status = 'completed';
    progress.progress = 100;
    progress.completedAt = new Date();
    await progress.save();
  }

  return progress;
};

// GET progress of a lesson
const getLessonProgressService = async (userId, lessonId) => {
  return await LessonProgress.findOne({
    where: { userId, lessonId }
  });
};

// GET overall progress in a course
const getCourseProgressService = async (userId, courseId) => {
  const lessons = await Lesson.findAll({
    include: {
      model: Module,
      as: 'module',
      where: { courseId }
    }
  });

  const lessonIds = lessons.map((l) => l.id);

  const completedCount = await LessonProgress.count({
    where: {
      userId,
      lessonId: {
        [Op.in]: lessonIds
      },
      status: 'completed'
    }
  });

  return {
    totalLessons: lessonIds.length,
    completedLessons: completedCount,
    completionPercentage:
      lessonIds.length === 0 ? 0 : Math.round((completedCount / lessonIds.length) * 100)
  };
};

// RESET progress
const resetLessonProgressService = async (userId, lessonId) => {
  await LessonProgress.destroy({ where: { userId, lessonId } });
};

module.exports = {
  markLessonAsCompleteService,
  getLessonProgressService,
  getCourseProgressService,
  resetLessonProgressService
};
