const Joi = require('joi');

exports.markLessonCompleteSchema = Joi.object({
  body: Joi.object().empty(), // No body needed for now
  params: Joi.object({
    lessonId: Joi.string().uuid().required()
  })
});
