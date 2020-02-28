const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const imagesRoutes = require("./routes/images");
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || "0.0.0.0";
const parserSecret = process.env.COOKIE_SECRET || "justfordevelopment";
require("../database/mongoose");

const buildPath = path.join(__dirname, "..", "build");
const imagesPath = path.join(__dirname, "public", "images");

const origin =
  process.env.NODE_ENV === "production"
    ? `https://solidistic-blog.herokuapp.com`
    : "http://localhost:3000";

// Static
app.use(express.static(buildPath));
app.use("/images", express.static(imagesPath));

// npm packages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(parserSecret));
app.use(helmet());
app.use(cors({ credentials: true, origin }));

// Routes
app.use("/backend/posts", postRoutes);
app.use("/backend/users", userRoutes);
app.use("/backend/", authRoutes);
app.use("/backend/images", imagesRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.on("error", e => console.log("Server error:", e));
app.listen(port, host, () => {
  console.log(`Server is up and running on http://${host}:${port}`);
});
