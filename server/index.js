const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const app = express();
const port = process.env.PORT || 8080;
const parserSecret = "anothersecret";
require("../database/mongoose");

const buildPath = path.join(__dirname, "..", "..", "build");

app.use(express.static(buildPath));

// npm packages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/", authRoutes);

app.on("error", e => console.log("Server error:", e));
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
