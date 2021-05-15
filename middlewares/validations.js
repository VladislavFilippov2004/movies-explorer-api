const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле email должно быть заполнено',
        'any.email': 'Введите email',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле password должно быть заполнено',
      }),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Отсутствует поле email',
        'string.email': 'Необходимо указать email в корректном формате',
        'string.empty': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required().min(6)
      .messages({
        'any.required': 'Отсутствует поле password',
        'string.min': 'Пароль не может быть короче 6-ти символов',
        'string.empty': 'Поле password должно быть заполнено',
      }),
    name: Joi.string().required()
      .messages({
        'any.required': 'Поле name должно быть заполнено',
      }),
  }),
});
const validateGetCurrentUser = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});
const validateUpdateProfile = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required()
      .messages({
        'string.empty': 'Введите имя',
        'any.required': 'Поле name должно быть заполнено',
      }),
  }),
});

const validateCreateMovie = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  body: Joi.object().keys({
    country: Joi.string().required().min(2)
      .messages({
        'any.required': 'Поле country должно быть заполнено',
        'string.min': 'Поле country не може быть короче 2-ух символов',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует director должно быть заполнено',
        'string.empty': 'Поле director должно быть заполнено',
      }),
    year: Joi.string().required().min(4)
      .messages({
        'any.required': 'Поле year должно быть заполнено',
        'string.min': 'В 999 году людям было не до кино)',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Отсутствует Поле duration',
        'string.empty': 'Поле duration должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Отсутсвует поле description',
        'string.empty': 'Поле description должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL');
    }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Отсутствует поле movieId',
        'string.empty': 'Поле movieId должно быть заполнено',
      }),
    nameRu: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует поле nameRu',
        'string.empty': 'Поле nameRu должно быть заполено',
      }),
    nameEn: Joi.string().required()
      .messages({
        'any.required': 'Отстутствует поле nameEn',
        'string.empty': 'Поле nameEn должно быть заполнено',
      }),
  }),
});
const validateGetMovies = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});
const validateDeleteMovie = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});
module.exports = {
  validateLogin,
  validateCreateUser,
  validateGetCurrentUser,
  validateUpdateProfile,
  validateCreateMovie,
  validateGetMovies,
  validateDeleteMovie,
};
