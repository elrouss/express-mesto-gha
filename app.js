const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { registerUser, loginUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const URL = 'mongodb://localhost:27017/mestodb';
const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(URL);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
}), registerUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), loginUser);

// TODO: несуществующую страницу?

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    const { statusCode = 400 } = err;

    res.status(statusCode).send({ message: 'Переданы некорректные данные' });
  }

  if (err.name === 'Error') res.status(err.statusCode).send({ message: err.message });

  if (err.code === 11000) {
    const { statusCode = 409 } = err;

    res.status(statusCode).send({ message: 'Пользователь с таким электронным адресом уже зарегистрирован' });
  }

  const { statusCode = 500 } = err;
  res.status(statusCode).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT);
