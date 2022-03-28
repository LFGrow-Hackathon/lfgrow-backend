const { Router } = require('express')
const router = Router()
const { setDispatcher, updateProfilPicture, createPost } = require("../service/index.js");

// router.post('/api/user', addUser);
router.post('/api/set-dispatcher', setDispatcher);
router.post('/api/update-picture', updateProfilPicture);
router.post('/api/create-post', createPost);

module.exports = router;
