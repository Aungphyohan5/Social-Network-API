const router = require('express').Router();
const { allUsers, createUser, getSingleUser, updateUser, deleteUser } = require('../../controllers/userController')

router.route('/').get(allUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router;
