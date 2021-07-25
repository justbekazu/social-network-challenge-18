// const { Schema, model, Types } = require("mongoose");
// const { formatDate } = require("date-utils-2020");
// const { user } = require("./user");

// const ReactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId(),
//     },
//     reactionBody: {
//       type: String,
//       required: "Please leave a reaction!",
//       maxLength: 280,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) => formatDate(createdAtVal),
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//   }
// );

// const ThoughtSchema = new Schema(
//   {
//     thoughtText: {
//       type: String,
//       required: true,
//       minLength: 1,
//       maxLength: 280,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) => formatDate(createdAtVal, "dd/MM/yyyy hh:mm"),
//     },
//     username: {
//       type: String,
//       required: true,
//       ref: "user",
//     },
//     reactions: [ReactionSchema],
//   },

//   {
//     toJSON: {
//       virtuals: true,
//       getters: true,
//     },
//     id: false,
//   }
// );

// ThoughtSchema.virtual("reactionCount").get(function () {
//   return this.reactions.length;
// });

// const thought = model("thought", ThoughtSchema);

// module.exports = thought;

const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtcontrol");

router.route("/").get(getAllThoughts);

router.route("/:userId").post(addThought);

router.route("/:thoughtId/:userId").delete(removeThought);

router.route("/:thoughtId").get(getThoughtById).put(updateThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
