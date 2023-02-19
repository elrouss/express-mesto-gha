/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { receiveUsers, receiveUser, createUser } = require('../controllers/users');

router.get('/', receiveUsers);
router.get('/:id', receiveUser);
router.post('/', createUser);

module.exports = router;
