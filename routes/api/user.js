// const { Schema, model } = require('mongoose');

// const UserSchema = new Schema(
//   {

//     email: {
//       type: String,
//       unique: true,
//       match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
//       required: 'Last Name is Required',
//       unique: true,
//       trim: true
//     },

//     userName: {
//         type: String,
//         trim: true,
//         required: 'User name required',
//         unique: true,
//         trim: true
//       },

//       userCreated: {
//         type: Date,
//         default: Date.now
//       }

//     }),

// const user = model('user', UserSchema);

// module.exports = user;

const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/usercontrol");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
