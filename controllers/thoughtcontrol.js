const { Usermodel, Thoughtmodel } = require("../models");

const thoughtControl = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thoughtmodel.findOne({ _id: params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addThought({ params, body }, res) {
    Thoughtmodel.create(body)
      .then(({ _id }) => {
        return Usermodel.findOneAndUpdate(
          { _id: params.userId },
          { $addToSet: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thoughtmodel.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  removeThought({ params }, res) {
    Thoughtmodel.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "no thought" });
        }
        return Usermodel.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(404).json(err));
  },

  addReaction({ params, body }, res) {
    Thoughtmodel.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, addValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  removeReaction({ params }, res) {
    Thoughtmodel.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};

module.exports = thoughtControl;
