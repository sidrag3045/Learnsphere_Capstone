const { Lesson, Module, Enrollment, Course } = require('../../models');
const { verifyModuleOwnership } = require('../../utils/resourceAuthorisation');

const { generateDownloadSignedUrl, generateUploadSignedUrl } = require('../aws/s3Service');

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

const getLessonWithSignedUrlService = async (lessonId, userId) => {
  const lesson = await Lesson.findByPk(lessonId, {
    include: {
      model: Module,
      include: { model: Course }
    }
  });
  if (!lesson) throw new Error('Lesson not found');

  const courseId = lesson.Module?.Course?.id;
  const enrolled = await Enrollment.findOne({ where: { userId, courseId } });
  if (!enrolled) throw new Error('You are not enrolled in this course');

  const signedUrl = lesson.s3Key ? await generateDownloadSignedUrl(lesson.s3Key) : null;

  return {
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    contentType: lesson.contentType,
    signedUrl
  };
};

// maps 'video/mp4' to 'video', etc.
function mapMimeTypeToEnum(mime) {
  if (mime.startsWith('video/')) return 'video';
  if (mime === 'application/pdf') return 'pdf';
  if (mime === 'text/html') return 'article';
  return 'video'; // default fallback
}

const uploadSignedUrlService = async (lessonId, instructorId, contentType, extension) => {
  const lesson = await Lesson.findByPk(lessonId, {
    include: {
      model: Module,
      include: {
        model: Course,
        where: { createdBy: instructorId }
      }
    }
  });

  if (!lesson) throw new Error('Unauthorized or lesson not found');

  const s3Key = `uploads/course_${lesson.Module.Course.id}/module_${lesson.Module.id}/lesson_${lesson.id}.${extension}`;

  const uploadUrl = await generateUploadSignedUrl(s3Key, contentType);

  lesson.s3Key = s3Key;
  lesson.contentType = mapMimeTypeToEnum(contentType);
  await lesson.save();

  return uploadUrl;
};

module.exports = {
  createLessonService,
  getLessonByIdService,
  getLessonsByModuleIdService,
  updateLessonService,
  deleteLessonService,
  reorderLessonsService,
  updateLessonStatusService,
  getLessonWithSignedUrlService,
  uploadSignedUrlService
};
