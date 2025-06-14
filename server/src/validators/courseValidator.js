const Joi = require('joi');

const courseSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  thumbnailKey: Joi.string().min(5).max(255).optional(),
  status: Joi.string().valid('draft', 'published', 'archived').required()
});

const updateCourseStatusSchema = Joi.object({
  status: Joi.string().valid('draft', 'published', 'archived').required()
});

const generateThumbnailUploadSchema = Joi.object({
  extension: Joi.string().valid('jpg', 'jpeg', 'png', 'webp').required()
});

module.exports = {
  courseSchema,
  updateCourseStatusSchema,
  generateThumbnailUploadSchema
};
