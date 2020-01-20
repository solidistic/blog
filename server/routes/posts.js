const express = require("express");
const router = express.Router();
const Post = require("../../database/models/post");
const auth = require("../middleware/auth");

// router.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

router.get("/all", async (req, res) => {
  try {
    const data = await Post.find({});
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
    const post = await Post.findById(req.params.id);
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
    const postData = new Post(req.body.post);
    const post = await postData.save();
    res.json({
      success: true,
      message: "Post has been added to database",
      post
    });
  } catch (e) {
    res.json({
      success: false,
      error: "Unable to save to database",
      body: e
    });
  }
});

router.patch("/edit/:id", auth, async (req, res) => {
  try {
    console.log("patching", req.params.id);
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

module.exports = router;
