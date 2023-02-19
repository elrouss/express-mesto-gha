const User = require('../models/user');

// TODO => refactor: вынести в отдельную функцию (DRY)

function receiveUsersData(req, res) {
  User
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе получения данных пользователей: ${err}` }));
}

function receiveUserData(req, res) {
  const { id } = req.params;

  User
    .findById(id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Пользователя с таким идентификатором не существует: ${err}` }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе создания нового пользователя ${err}` }));
}

module.exports = {
  receiveUsersData,
  receiveUserData,
  createUser,
};
