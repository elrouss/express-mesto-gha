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
    avatar: Joi.string().uri(),
  }),
}), setUserAvatar);

module.exports = router;
