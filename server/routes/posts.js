const express = require("express");
const router = express.Router();
const fs = require("fs");
const sharp = require("sharp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
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
      .populate({
        path: "comments",
        populate: { path: "postedBy", select: "username" }
      });
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

router.post("/create", auth, upload.single("heroImage"), async (req, res) => {
  let heroImg = undefined;

  if (req.file)
    heroImg = { data: req.file.buffer, contentType: req.file.mimetype };

  try {
    const user = await User.findById(req.cookies.id);
    const post = new Post({ author: user, heroImg, ...req.body });
    await user.posts.push(post._id);
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

router.patch(
  "/edit/:id",
  auth,
  upload.single("heroImage"),
  async (req, res) => {
    let heroImg,
      updates = undefined;

    if (req.file) {
      heroImg = { data: req.file.buffer, contentType: req.file.mimetype };
      updates = { heroImg, ...req.body };
    } else {
      updates = { ...req.body };
    }

    try {
      const post = await Post.findByIdAndUpdate(req.params.id, updates, {
        new: true
      });
      console.log("POST11", post);
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
  }
);

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

router.post("/comments/create", auth, async (req, res, next) => {
  console.log("Adding comment", req.body);
  try {
    const postedBy = await User.findById(req.cookies.id);
    const post = await Post.findById(req.body.id);
    const comment = new Comment({ post, postedBy, ...req.body.comment });

    // console.log(postedBy === null, post === null);
    // console.log("POSTED BY:", postedBy);
    // console.log("POST:", post);
    // console.log("NEW COMMENT:", comment);

    // if (!post || !postedBy) throw new Error("Can't find post or user");

    post.comments.push(comment._id);
    postedBy.comments.push(comment._id);

    Promise.all([post.save(), postedBy.save(), comment.save()]);
    // .then(() => console.log("PROMISE ALL DONE"))
    // .catch(e => console.log("PROMISE ALL ERROR", e));

    res.status(200).json({ message: "Comment added", comment });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error });
  }
});

router.patch("/comments/remove", auth, async (req, res) => {
  try {
    const postedBy = await User.findById(req.cookies.id);
    const post = await Post.findById(req.body.postId);
    const removedComment = await Comment.findByIdAndRemove(req.body.commentId);

    postedBy.comments.pull(removedComment._id);
    post.comments.pull(removedComment._id);

    Promise.all([post.save(), postedBy.save()]);

    res.status(200).json({ message: "Comment removed", removedComment });
  } catch (error) {
    res.status(500).json({ message: "Unable to remove comment", error });
  }
});

module.exports = router;
