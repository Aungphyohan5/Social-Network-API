const router = require('express').Router();
const { allUsers, createUser } = require('../../controllers/userController')

router.route('/').get(allUsers).post(createUser);

module.exports = router;
