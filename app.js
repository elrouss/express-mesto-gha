/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routeUsers = require('./routes/users');

const URL = 'mongodb://localhost:27017/mestodb';
const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose
  .connect(URL)
  .then(() => console.log('Соединение с MongoDB установлено'))
  .catch((err) => console.log(`Возникла ошибка при соединении с MongoDB: ${err}`));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', routeUsers);

app.listen(PORT, (err) => {
  err ? console.log(`В процессе соединения с портом возникла ошибка: ${err}`) : console.log(`Соединение с портом № ${PORT} успешно установлено`);
});
