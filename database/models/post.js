const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: String,
  createdAt: Object,
  editedAt: Object,
  likes: Number,
  comments: [{ body: String, name: String }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;