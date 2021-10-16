const express = require("express");
const router = express.Router();
const sharp = require("sharp");
const multer = require("multer");
const path = require("path");
const Post = require("../../database/models/post");
const Comment = require("../../database/models/comment");
const User = require("../../database/models/user");
const auth = require("../middleware/auth");
// const AWS_S3 = require("../storage/aws-s3");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

// in progress...
// const storage = AWS_S3({
//   destination: function (req, file, cb) {
//     cb(null, `/images/${file.originalname}`);
//   }
// });

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error("File must be an image"));
    cb(undefined, true);
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await Post.find({ isPublic: true })
      .populate("author", "username")
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
  console.log("Body", req.body);
  let image = undefined;

  try {
    // upload(req, res, err => {
    //   if (err instanceof multer.MulterError) {
    //     console.log("running here", err);
    //     return new Error("File is not valid");
    //   } else if (err) {
    //     console.log("also herer", err);
    //   }
    // });

    if (req.file) {
      image = {
        name: req.file.originalname,
        contentType: req.file.mimetype
      };
    } else if (req.body.heroImage) {
      image = { name: req.body.heroImage };
    }

    const post = new Post({ author: req.user, image, ...req.body });
    await req.user.posts.push(post._id);
    await req.user.save();

    const postData = await post.save();
    res.status(200).json({
      message: "Post has been added to database",
      post: postData
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to save to database",
      body: error
    });
  }
});

router.patch(
  "/edit/:id",
  auth,
  upload.single("heroImage"),
  async (req, res) => {
    console.log("updating...", req.file, req.body);
    let image,
      updates = undefined;

    if (req.file) {
      image = { name: req.file.originalname, contentType: req.file.mimetype };
    } else if (req.body.heroImage) {
      image = { name: req.body.heroImage };
    }
    updates = { image, ...req.body };

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
    const post = await Post.findById(req.body.id);
    const comment = new Comment({
      post,
      postedBy: req.user,
      ...req.body.comment
    });

    post.comments.push(comment._id);
    req.user.comments.push(comment._id);

    Promise.all([post.save(), req.user.save(), comment.save()]);

    res.status(200).json({ message: "Comment added", comment });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error });
  }
});

router.patch("/comments/remove", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    const removedComment = await Comment.findByIdAndRemove(req.body.commentId);

    req.user.comments.pull(removedComment._id);
    post.comments.pull(removedComment._id);

    Promise.all([post.save(), req.user.save()]);

    res.status(200).json({ message: "Comment removed", removedComment });
  } catch (error) {
    res.status(500).json({ message: "Unable to remove comment", error });
  }
});

router.patch("/likes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.toggleLike(req.body.userId);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
