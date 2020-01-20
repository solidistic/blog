const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "You must provide an username"],
    unique: [true, "Username is already in use"]
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use"],
    validate: {
      validator: function(email) {
        return validator.isEmail(email);
      }
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  isAdmin: Boolean,
  tokens: [
    {
      token: { type: String, required: true }
    }
  ]
});

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    try {
      const hashPw = await bcrypt.hash(this.password, 10);
      this.password = hashPw;
    } catch (e) {
      throw new Error("Error in presave function");
    }
  }
  next();
});

userSchema.statics.findByName = function(username) {
  return this.findOne({ username: username });
};

userSchema.methods.createToken = async function(password) {
  const pwMatch = await bcrypt.compare(password, this.password);
  if (pwMatch) {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      "this should be a secret",
      {
        expiresIn: "1h"
      }
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } else {
    throw new Error("Unable to create token");
  }
};

userSchema.methods.comparePasswords = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
