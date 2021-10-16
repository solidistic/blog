const express = require("express");
const router = express.Router();
const User = require("../../database/models/user");
const Post = require("../../database/models/post");
const Comment = require("../../database/models/comment");
const auth = require("../middleware/auth");

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw new Error();

    // OTA SELVÄÄ:
    // pitäisi toimiä myös spread operaattorilla:
    // const { password, tokens, ...publicUser } = user;
    // mutta palauttaa publicUseriksi oudon objektin??
    const publicUser = {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      description: user.description
    };
    res.status(200).json(publicUser);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!", error: e });
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    req.user.posts.forEach(async post => {
      try {
        await Post.findByIdAndRemove(post._id);
        console.log("Removed: ", post);
      } catch (e) {
        console.log("Unable to remove post", e);
      }
    });

    req.user.comments.forEach(async comment => {
      try {
        await Comment.findByIdAndRemove(comment._id);
        console.log("Removed: ", comment);
      } catch (e) {
        console.log("Unable to remove comment", e);
      }
    });

    res
      .status(200)
      .clearCookie("jwt_token")
      .clearCookie("id")
      .json({ message: "Account removed", id: req.user._id });
  } catch (e) {
    res.status(500).json({ message: "Unable to remove account" });
  }
});

router.patch("/update", auth, async (req, res) => {
  try {
    const correctPassword = await req.user.comparePasswords(req.body.password);

    if (!req.user || !correctPassword) throw new Error();

    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      req.body.updates,
      {
        new: true
      }
    ).populate({
      path: "posts",
      match: { isPublic: false }
    });
    console.log(updatedUser);
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Unable to save user infromation", error });
  }
});

module.exports = router;
