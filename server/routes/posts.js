const express = require("express");
const router = express.Router();
const sharp = require("sharp");
const multer = require("multer");
const path = require("path");
const Post = require("../../database/models/post");
const Comment = require("../../database/models/comment");
const User = require("../../database/models/user");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error("File must be an image"));
    cb(undefined, true);
  }
});

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
      error: "Unable to get the post by id",
      body: e
    });
  }
});

router.post("/create", auth, upload.single("heroImage"), async (req, res) => {
  console.log("Create post", req.file);
  let image = undefined;

  try {
    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        return new Error("File is not valid");
      }
    });

    if (req.file) {
      const buffer = await sharp(req.file)
        .resize(1000)
        .png();
      console.log("BUFFER", buffer);
      image = {
        name: `${req.file.originalname}`,
        contentType: req.file.mimetype
      };
    }

    const user = await User.findById(req.cookies.id);
    const post = new Post({ author: user, image, ...req.body });

    await user.posts.push(post._id);
    await user.save();

    const postData = await post.save();
    res.status(200).json({
      message: "Post has been added to database",
      post: postData
    });
  } catch (e) {
    res.status(500).json({
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
    console.log("updating...");
    let image,
      updates = undefined;

    if (req.file) {
      image = { name: req.file.originalname, contentType: req.file.mimetype };
      updates = { image, ...req.body };
    } else {
      updates = { ...req.body };
    }

    try {
      const post = await Post.findByIdAndUpdate(req.params.id, updates, {
        new: true
      });

      if (!post) {
        throw new Error("No post with given id");
      }

      res.json({
        message: "Post has been updated",
        post
      });
    } catch (e) {
      res.json({
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
      message: "Post removed successfully",
      post
    });
  } catch (e) {
    res.json({
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
