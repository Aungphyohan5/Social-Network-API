const router = require('express').Router();
const { allUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');
const { route } = require('./thoughtRoutes');

router.route('/').get(allUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)


module.exports = router;
