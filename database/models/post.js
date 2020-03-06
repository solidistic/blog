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
  likes: {
    count: { type: Number },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  isPublic: Boolean,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

postSchema.methods.toggleLike = async function(userId) {
  if (this.likes.users.includes(userId.toString())) {
    this.likes.users = this.likes.users.filter(
      id => id.toString() !== userId.toString()
    );
  } else {
    this.likes.users.push(userId);
  }
  this.likes.count = this.likes.users.length;
  await this.save();
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
