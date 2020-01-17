const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../../database/models/user");

const publicPath = path.join(__dirname, "..", "..", "build");

router.use(express.static(publicPath));

router.post("/create", async (req, res) => {
  try {
    const user = new User(req.body.user);
    const account = await user.save();
    res.json({
      success: true,
      message: "Account created succesfully",
      account
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Unable to create account",
      body: e
    })
  }
});

module.exports = router;