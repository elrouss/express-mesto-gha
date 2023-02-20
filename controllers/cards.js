const Card = require('../models/card');

// TODO => refactor: вынести в отдельную функцию (DRY)

function receiveCards(req, res) {
  Card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе получения данных карточек: ${err}` }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  Card
    .create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе создания новой карточки ${err}` }));
}

function likeCard(req, res) {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

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
        upsert: false,
      },
    )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка при добавлении лайка: ${err}` }));
}

function dislikeCard(req, res) {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

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
        upsert: false,
      },
    )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка при снятии лайка: ${err}` }));
}

function deleteCard(req, res) {
  const { id } = req.params;

  Card
    .findByIdAndRemove(id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе удаления карточки: ${err}` }));
}

module.exports = {
  receiveCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
