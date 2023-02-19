/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { receiveCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', receiveCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);

module.exports = router;
