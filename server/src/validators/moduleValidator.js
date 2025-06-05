const Joi = require('joi');

const moduleSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  order: Joi.number().integer().required(),
  courseId: Joi.string().guid({ version: ['uuidv4'] }).required(),
  status: Joi.string().valid('draft', 'published', 'archived').required(),
});

const reorderModulesSchema = Joi.object({
  modules: Joi.array().items(
    Joi.object({
      id: Joi.string().uuid().required(),
      order: Joi.number().integer().required()
    })
  ).min(1).required()
});

const updateModuleStatusSchema = Joi.object({
  status: Joi.string().valid('draft', 'published', 'archived').required()
});

module.exports = {
  moduleSchema,
  reorderModulesSchema,
  updateModuleStatusSchema
};
