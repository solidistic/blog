const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: Object,
  body: { type: String, requied: true }
  // replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
