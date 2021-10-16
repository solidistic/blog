const mongoose = require("mongoose");

const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blog";

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  server: {
    auto_reconnect: true,
  },
};

mongoose.connect(url, connectionOptions);

const db = mongoose.connection;

db.once("error", (e) => console.log("MongoDB error:", e));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
db.on("reconnect", () => console.log("MongoDB reconnected!"));
db.on("disconnect", () => {
  console.log("MongoDB disconnected.. retrying..");
  mongoose.connect(url, connectionOptions);
});

module.exports = db;
