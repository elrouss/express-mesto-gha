const Card = require('../models/card');

const NotFoundError = require('../errors/NotFound');

function receiveCards(req, res, next) {
  Card
    .find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const { userId } = req.user;

  Card
    .create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
}

function likeCard(req, res, next) { // TODO: Проверить, что пользователь может ставить и снимать не более 1 лайка
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $addToSet: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.status(200).send({ data: card });

      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch(next);
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.status(200).send({ data: card });

      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .findOneAndRemove({
      _id: cardId,
      owner: userId,
    })
    .then((card) => {
      if (card) return res.status(200).send({ data: card });

      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch(next);
}

module.exports = {
  receiveCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
