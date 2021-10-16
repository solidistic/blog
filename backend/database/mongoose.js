const mongoose = require("mongoose");

const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blog";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.once("error", e => console.log("MongoDB error:", e));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
