const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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
  isAdmin: Boolean
});

userSchema.pre("save", async function(next) {
  const hashPw = await bcrypt.hash(this.password, 10);
  this.password = hashPw;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
