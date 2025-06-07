const Joi = require('joi');

const lessonSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(5000).allow('', null),
  s3Key: Joi.string().max(2048).when('contentType', {
    is: Joi.valid('video', 'pdf'),
    then: Joi.required().messages({
      'any.required': 's3Key is required for video or pdf content.'
    }),
    otherwise: Joi.optional()
  }),
  contentType: Joi.string().valid('video', 'pdf', 'article').required(),
  duration: Joi.number().integer().required(),
  order: Joi.number().integer().optional(),
  status: Joi.string().valid('draft', 'published', 'archived').required(),
  moduleId: Joi.string().guid({ version: ['uuidv4'] }).required()
});

const reorderLessonsSchema = Joi.object({
  lessons: Joi.array().items(
    Joi.object({
      id: Joi.string().guid({ version: ['uuidv4'] }).required(),
      order: Joi.number().integer().required()
    })
  ).min(1).required()
});

const updateLessonStatusSchema = Joi.object({
  status: Joi.string().valid('draft', 'published', 'archived').required()
});

const generateUploadUrlSchema = Joi.object({
  contentType: Joi.string().valid('video/mp4', 'application/pdf', 'text/html').required(),
  extension: Joi.string().valid('mp4', 'pdf', 'html').required()
});

module.exports = {
  lessonSchema,
  reorderLessonsSchema,
  updateLessonStatusSchema,
  generateUploadUrlSchema
};
