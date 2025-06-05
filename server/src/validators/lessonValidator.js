const Joi = require('joi');

const lessonSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).max(1000).optional(),
  videoUrl: Joi.string().uri().required(),
  duration: Joi.number().integer().required(),
  order: Joi.number().integer().required(),
  status: Joi.string().valid('draft', 'published', 'archived').required(),
  moduleId: Joi.string().guid({ version: ['uuidv4'] }).required()
});

const reorderLessonsSchema = Joi.object({
  lessons: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().required(),
      order: Joi.number().integer().required()
    })
  ).min(1).required()
});

const updateLessonStatusSchema = Joi.object({
  status: Joi.string().valid('draft', 'published', 'archived').required()
});

module.exports = {
  lessonSchema,
  reorderLessonsSchema,
  updateLessonStatusSchema
};
