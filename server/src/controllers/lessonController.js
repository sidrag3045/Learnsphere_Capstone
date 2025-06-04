const { createLessonService,
        getLessonByIdService,
        getLessonsByModuleIdService,
        updateLessonService,
        deleteLessonService } = require('../services/lessonService');

const createLesson = async (req, res) => {
  try {
    const lesson = await createLessonService(req.params.moduleId, req.body, req.user.id);
    res.status(201).json({ message: 'Lesson created successfully', lesson });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLessonsByModuleId = async (req, res) => {
  try {
    const lessons = await getLessonsByModuleIdService(req.params.moduleId);
    res.status(200).json({ lessons });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const getLessonById = async (req, res) => {
  try {
    const lesson = await getLessonByIdService(req.params.id);
    res.status(200).json({ lesson });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    const lesson = await updateLessonService(req.params.id, req.body, req.user.id);
    res.status(200).json({ message: 'Lesson updated successfully', lesson });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    await deleteLessonService(req.params.id, req.user.id);
    res.status(200).json({ message: 'Lesson deleted successfully', lesson });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createLesson,
  getLessonsByModuleId,
  getLessonById,
  updateLesson,
  deleteLesson
};
