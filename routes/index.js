const { Router } = require('express')
const router = Router()
const { setDispatcher, updateProfilPicture } = require("../service/index.js");

// router.post('/api/user', addUser);
router.post('/api/set-dispatcher', setDispatcher);
router.post('/api/update-picture', updateProfilPicture);

module.exports = router;
