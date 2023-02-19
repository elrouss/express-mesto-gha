/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  User
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе получения данных пользователей: ${err}` }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  User
    .findById(id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Пользователя с таким идентификатором не существует: ${err}` }));
});

router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;

  User
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка в процессе создания нового пользователя ${err}` }));
});

module.exports = router;
