const Joi = require('joi');

const courseSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  thumbnailUrl: Joi.string().uri().optional(),
  status: Joi.string().valid('draft', 'published', 'archived').required(),
  createdBy: Joi.string().guid({ version: ['uuidv4'] }).required()
});

const updateCourseStatusSchema = Joi.object({
  status: Joi.string().valid('draft', 'published', 'archived').required()
});

module.exports = {
  courseSchema,
  updateCourseStatusSchema
};
