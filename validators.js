const Joi = require("joi");

const userSchemaMovie = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  color: Joi.string().max(255).required(),
  duration: Joi.number().required(),
});

const validateMovie = (req, res, next) => {

  const { error } = userSchemaMovie.validate(
    req.body,
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const userSchemaUser = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(),
});



const validateUser = (req, res, next) => {

  const { error } = userSchemaUser.validate(
    req.body,
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}

module.exports = {
  validateMovie,
  validateUser,
};