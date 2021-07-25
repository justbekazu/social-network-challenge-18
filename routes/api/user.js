const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
  
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      required: 'Last Name is Required',
      unique: true,
      trim: true
    },

    userName: {
        type: String,
        trim: true,
        required: 'User name required',
        unique: true,
        trim: true
      },

      userCreated: {
        type: Date,
        default: Date.now
      }

    }),


const User = model('User', UserSchema);

module.exports = User;
