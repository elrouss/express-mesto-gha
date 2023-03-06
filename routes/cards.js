const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  receiveCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

router.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), createCard);

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), receiveCards);

router.put('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), dislikeCard);

router.delete('/:id', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), deleteCard);

module.exports = router;
