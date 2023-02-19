/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { receiveUsersData, receiveUserData, createUser } = require('../controllers/users');

router.get('/', receiveUsersData);
router.get('/:id', receiveUserData);
router.post('/', createUser);

module.exports = router;
