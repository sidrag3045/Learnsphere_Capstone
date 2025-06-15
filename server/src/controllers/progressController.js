const {
  markLessonAsCompleteService,
  getLessonProgressService,
  getCourseProgressService,
  resetLessonProgressService
} = require('../services/progress/progressService');

const markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;
    const progress = await markLessonAsCompleteService(userId, lessonId);
    res.status(200).json({ message: 'Lesson marked as complete', progress });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLessonProgressByStudent = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;
    const progress = await getLessonProgressService(userId, lessonId);
    res.status(200).json({ progress });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;
    const courseProgress = await getCourseProgressService(userId, courseId);
    res.status(200).json({ courseProgress });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const resetLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;
    await resetLessonProgressService(userId, lessonId);
    res.status(200).json({ message: 'Progress reset successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  markLessonComplete,
  getLessonProgressByStudent,
  getCourseProgress,
  resetLessonProgress
};
