const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');


router
  .route('/')
  .get(getAllUsers)
  .post(createUser);


router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addFriend);


router
  .route('/:userId/friends/:friendId')
  .delete(removeFriend);

module.exports = router;