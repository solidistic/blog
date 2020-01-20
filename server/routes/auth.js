const express = require("express");
const router = express.Router();
const User = require("../../database/models/user");

router.post("/login", async (req, res) => {
  let user, token;

  try {
    if (req.cookies.id && req.cookies.jwt_token) {
      user = await User.findById(req.cookies.id);
      token = req.cookies.jwt_token;
    } else {
      user = await User.findByName(req.body.username);
      token = await user.createToken(req.body.password);
    }

    if (!user) {
      throw new Error("User not found");
    }

    res
      .status(200)
      .cookie("jwt_token", token, {
        httpOnly: true,
        maxAge: 5000000
        // signed: true
        //, secure: true
      })
      .cookie("id", user._id, { httpOnly: true })
      .json({ message: "Logged in successfully ", user });
  } catch (e) {
    res.status(500).json({ message: "Unable to login", error: e });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body.user);
    await user.createToken();
    const account = await user.save();
    res.status(201).json({
      success: true,
      message: "Account created succesfully",
      account
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Unable to create account",
      body: e
    });
  }
});

router.post("/logout", (req, res) => {
  res
    .status(200)
    .clearCookie("jwt_token")
    .json({ message: "Logged out successfully" });
});

module.exports = router;
