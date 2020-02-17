const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: { name: String },
  createdAt: Object,
  editedAt: Object,
  likes: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
