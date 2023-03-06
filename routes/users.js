const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsersInfo,
  getUserInfo,
  getCurrentUserInfo,

  setUserInfo,
  setUserAvatar,
} = require('../controllers/users');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), getUsersInfo);

router.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), getCurrentUserInfo);

router.get('/:id', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), getUserInfo);

router.patch('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), setUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), setUserAvatar);

module.exports = router;
