const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
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
    },
    id: false,
  }
);

const Usermodel = model("Usermodel", UserSchema);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = Usermodel;
