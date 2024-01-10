const express = require('express');
const router = express.Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// Routes for /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// Routes for /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Routes for /api/users/:userId/friends
router.route('/:userId/friends')
  .post(addFriend);

// Routes for /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .delete(deleteFriend);

module.exports = router;