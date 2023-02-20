const User = require('../models/user');

// TODO => refactor: вынести в отдельную функцию (DRY)

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе создания нового пользователя: ${err}` }));
}

function getUsersInfo(req, res) {
  User
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе получения данных пользователей: ${err}` }));
}

function getUserInfo(req, res) {
  const { id } = req.params;

  User
    .findById(id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Пользователя с таким идентификатором не существует: ${err}` }));
}

function setUserInfo(req, res) {
  const { name, about } = req.body;
  const { _id } = req.user;

  User
    .findByIdAndUpdate(
      _id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Возникла ошибки в процессе изменения данных пользователя: ${err}` }));
}

function setUserAvatar(req, res) {
  const { avatar } = req.body;
  const { _id } = req.user;

  User
    .findByIdAndUpdate(
      _id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Возникла ошибки в процессе изменения аватара пользователя: ${err}` }));
}

module.exports = {
  createUser,
  getUsersInfo,
  getUserInfo,
  setUserInfo,
  setUserAvatar,
};
