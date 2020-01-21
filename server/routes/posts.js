const express = require("express");
const router = express.Router();
const Post = require("../../database/models/post");
const Comment = require("../../database/models/comment");
const User = require("../../database/models/user");
const auth = require("../middleware/auth");

// router.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

router.get("/all", async (req, res) => {
  try {
    const data = await Post.find({})
      .populate("author")
      .populate("comments")
      .populate({ path: "comments", populate: { path: "postedBy", select: "username" } });
    res.json(data);
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "Unable to get the posts from database",
      body: e
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    res.json(post);
  } catch (e) {
    res.json({
      success: false,
      error: "Unable to get the post by id",
      body: e
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const user = await User.findById(req.cookies.id);
    const post = new Post({ author: user, ...req.body.post });
    await user.posts.push(post);
    await user.save();
    const postData = await post.save();
    res.status(200).json({
      success: true,
      message: "Post has been added to database",
      post: postData
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "Unable to save to database",
      body: e
    });
  }
});

router.patch("/edit/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body.updates
      },
      {
        new: true
      }
    );
    if (!post) {
      throw new Error("No post with given id");
    }
    res.json({
      success: true,
      message: "Post has been updated",
      post
    });
  } catch (e) {
    res.json({
      success: false,
      error: "Unable to update the post to database",
      body: e
    });
  }
});

router.delete("/remove/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.json({
      success: true,
      message: "Post removed successfully",
      post
    });
  } catch (e) {
    res.json({
      success: false,
      error: "Unable to delete post",
      body: e
    });
  }
});

router.post("/comments/create", auth, async (req, res) => {
  try {
    const postedBy = await User.findById(req.cookies.id);
    const post = await Post.findById(req.body.id);
    const comment = new Comment({ post, postedBy, ...req.body.comment });

    if (!post || !postedBy) throw new Error("Can't find post or user");

    post.comments.push(comment);
    postedBy.comments.push(comment);

    await post.save();
    await postedBy.save();
    await comment.save();
    res.status(200).send("Comment added");
  } catch (error) {
    res.status(500).send({ message: "Unable to add comment", error });
  }
});

module.exports = router;
