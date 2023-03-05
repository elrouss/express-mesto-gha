const router = require('express').Router();
const {
  getUsersInfo,
  getUserInfo,
  getCurrentUserInfo,

  setUserInfo,
  setUserAvatar,
} = require('../controllers/users');

router.get('/', getUsersInfo);
router.get('/me', getCurrentUserInfo);
router.get('/:id', getUserInfo);

router.patch('/me', setUserInfo);
router.patch('/me/avatar', setUserAvatar);

module.exports = router;
