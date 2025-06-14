const { Course, User } = require('../../models');
const { generateUploadSignedUrl } = require('../../services/aws/s3Service');
const { generatePublicUrl } = require('../../services/aws/cloudfrontService');


const createCourseService = async (data, instructorId) => {

  const instructor = await User.findByPk(instructorId);
  if (!instructor) throw new Error('Instructor not found');

  return await Course.create({ ...data, createdBy: instructorId });
};

const getAllCoursesService = async () => {

  const courses = await Course.findAll({
    include: {
      model: User,
      as: 'instructor',
      attributes: ['id', 'fullName', 'email']
    },
    order: [['createdAt', 'DESC']]
  });

  return courses.map(course => {
      const plain = course.toJSON();
      plain.thumbnailUrl = course.thumbnailKey ? generatePublicUrl(course.thumbnailKey) : null;
      console.log('Course:', plain);
      return plain;
    });
};

const getCourseByIdService = async (id) => {

  const course = await Course.findByPk(id, {
    include: {
      model: User,
      as: 'instructor',
      attributes: ['id', 'fullName', 'email']
    }
  });

  if (!course) throw new Error('Course not found');
  const plain = course.toJSON();
  plain.thumbnailUrl = course.thumbnailKey ? generatePublicUrl(course.thumbnailKey) : null;
  return plain;
};

const getCoursesByInstructorService = async (instructorId) => {

  const courses = await Course.findAll({
    where: { createdBy: instructorId },
    include: {
      model: User,
      as: 'instructor',
      attributes: ['id', 'fullName', 'email']
    },
    order: [['createdAt', 'DESC']]
  });

  return courses.map(course => {
    const plain = course.toJSON();
    plain.thumbnailUrl = course.thumbnailKey ? generatePublicUrl(course.thumbnailKey) : null;
    return plain;
  });
};

const updateCourseService = async (id, updatedData) => {
  
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');

  Object.assign(course, updatedData);
  await course.save();

  return course;
};

const deleteCourseService = async (id) => {
  
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');

  await course.destroy();
  return course;
};

const updateCourseStatusService = async (id, status) => {

  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');

  course.status = status;
  await course.save();

  return course;
};

const generateThumbnailUploadService = async (courseId, extension, instructorId) => {

  const course = await Course.findByPk(courseId);
  if (!course) throw new Error('Course not found');
  if (course.createdBy !== instructorId) throw new Error('Unauthorized');

  const thumbnailKey = `uploads/thumbnails/course_${courseId}.${extension}`;
  const uploadUrl = await generateUploadSignedUrl(thumbnailKey, `image/${extension}`);

  course.thumbnailKey = thumbnailKey;
  await course.save();

  return uploadUrl;
};

module.exports = {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
  getCoursesByInstructorService,
  updateCourseStatusService,
  generateThumbnailUploadService
};