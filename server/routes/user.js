const express = require("express");
const router = express.Router();
const User = require("../../database/models/user");

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("posts");
    if (!user) {
      throw new Error("Account doesn't exist");
    }
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
      posts: user.posts
    };
    res.status(200).json(publicUser);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!", error: e });
  }
});

module.exports = router;
