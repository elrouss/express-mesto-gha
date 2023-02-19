/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO => fix: валидация (см. models -> user) + add: vaersion key (см. там же)

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v >= 2 && v <= 30;
      },
      message: 'Имя карточки должно быть длиной от 2 до 30 символов',
    },
  },

  link: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.ObjectId,
    required: true,
    validate: {
      validator(v) {
        return v;
      },
      message: 'Отсутствует идентификатор автора карточки',
    },
  },

  likes: [{
    type: mongoose.ObjectId,
    default: [],
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
