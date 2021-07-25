const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
      required: true,
      unique: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughtmodel",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Usermodel",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const Usermodel = model("Usermodel", UserSchema);

module.exports = Usermodel;
