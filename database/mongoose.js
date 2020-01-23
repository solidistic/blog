const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog", {
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
