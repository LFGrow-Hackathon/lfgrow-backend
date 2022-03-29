const { Router } = require('express')
const router = Router()
const {
  setDispatcher,
  updateProfilPicture,
  createPost,
  createComment,
  follow,
  unfollow
} = require("../service/index.js");

// router.post('/api/user', addUser);
router.post('/api/set-dispatcher', setDispatcher);
router.post('/api/update-picture', updateProfilPicture);
router.post('/api/create-post', createPost);
router.post('/api/create-comment', createComment);
router.post('/api/follow', follow);
router.post('/api/unfollow', unfollow);

module.exports = router;
