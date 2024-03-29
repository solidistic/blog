const express = require("express");
const router = express.Router();
const User = require("../../database/models/user");
const auth = require("../middleware/auth");
const secureCookie = {
  httpOnly: true,
  maxAge: 5000000,
  signed: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

router.post("/login", async (req, res) => {
  let user, token;
  const querySelector = "-posts -comments";

  console.log(req.signedCookies);

  try {
    if (req.signedCookies.id && req.signedCookies.jwt_token) {
      user = await User.findById(req.signedCookies.id, querySelector);
      token = req.signedCookies.jwt_token;
    } else if (req.body) {
      user = await User.findByName(req.body.username, querySelector);
      token = await user.createToken(req.body.password);
    } else {
      throw new Error();
    }

    if (!user) throw new Error("User not found");

    const privatePosts = await User.findById(
      req.signedCookies.id || user._id,
      "posts comments"
    )
      .populate({
        path: "posts",
        match: { isPublic: false },
        populate: { path: "author", select: "username" }
      })
      .populate({
        path: "posts",
        match: { isPublic: false },
        populate: {
          path: "comments",
          populate: { path: "postedBy", select: "username" }
        }
      });

    res
      .status(200)
      .cookie("jwt_token", token, secureCookie)
      .cookie("id", user._id, secureCookie)
      .json({ message: "Logged in successfully ", user, privatePosts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Unable to login", error: e.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body.user);
    const token = await user.createToken();
    const account = await user.save();
    console.log(account);
    console.log(token);
    res
      .status(201)
      .cookie("jwt_token", token, secureCookie)
      .cookie("id", account._id, secureCookie)
      .json({
        message: "Account created succesfully",
        account
      });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create account",
      body: error
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const user = await User.findById(req.signedCookies.id);
    user.tokens = user.tokens.filter(
      index => index.token !== req.signedCookies.jwt_token
    );
    await user.save();
    res
      .status(200)
      .clearCookie("jwt_token")
      .clearCookie("id")
      .json({ message: "Logged out successfully" });
  } catch (e) {
    res.status(400).json({
      message: "Unable to logout safely"
    });
  }
});

router.post("/logoutAll", auth, async (req, res) => {
  try {
    const user = await User.findById(req.cookies.id);
    user.tokens = [];
    await user.save();
    res
      .status(200)
      .clearCookie("jwt_token")
      .clearCookie("id")
      .json({ message: "Logged out successfully" });
  } catch (e) {
    res.status(400).json({
      message: "Unable to logout safely from all devices"
    });
  }
});

module.exports = router;
