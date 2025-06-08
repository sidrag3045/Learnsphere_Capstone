const { createLessonService,
        getLessonByIdService,
        getLessonsByModuleIdService,
        updateLessonService,
        deleteLessonService,
        reorderLessonsService,
        updateLessonStatusService,
        getLessonWithSignedUrlService,
        uploadSignedUrlService } = require('../services/lesson/lessonService');

const createLesson = async (req, res) => {
  const { moduleId } = req.params;
  const body = req.body;
  const userId = req.user.id;
  try {
    const lesson = await createLessonService(moduleId, body, userId);
    res.status(201).json({ message: 'Lesson created successfully', lesson });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLessonsByModuleId = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const lessons = await getLessonsByModuleIdService(moduleId);
    res.status(200).json({ lessons });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const getLessonById = async (req, res) => {
  const { id } = req.params;
  try {
    const lesson = await getLessonByIdService(id);
    res.status(200).json({ lesson });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateLesson = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const userId = req.user.id;
  try {
    const lesson = await updateLessonService(id, body, userId);
    res.status(200).json({ message: 'Lesson updated successfully', lesson });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteLesson = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const lesson = await deleteLessonService(id, userId);
    res.status(200).json({ message: 'Lesson deleted successfully', lesson });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const reorderLessons = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { moduleId } = req.params;
    const { lessons } = req.body;

    if (!Array.isArray(lessons)) {
      return res.status(400).json({ message: 'Lessons array is required' });
    }

    const result = await reorderLessonsService(instructorId, moduleId, lessons);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateLessonStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await updateLessonStatusService(id, { status });
    res.status(200).json({ message: 'Lesson updated successfully', lesson: { id, status } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// For enrolled student to view lesson content
const getLessonContent = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    const lesson = await getLessonWithSignedUrlService(id, studentId);
    return res.status(200).json({ lesson });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

// For instructor to upload content (signed URL generation)
const uploadLessonContent = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;
    const { contentType, extension } = req.body;

    const uploadUrl = await uploadSignedUrlService(id, instructorId, contentType, extension);
    return res.status(200).json({ uploadUrl });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createLesson,
  getLessonsByModuleId,
  getLessonById,
  updateLesson,
  deleteLesson,
  reorderLessons,
  updateLessonStatus,
  getLessonContent,
  uploadLessonContent
};
