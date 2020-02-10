const path = require("path");
const fs = require("fs");
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
const host = process.env.HOST || "0.0.0.0";
const parserSecret = "anothersecret";
require("../database/mongoose");

const buildPath = path.join(__dirname, "..", "..", "build");
const imagesPath = path.join(__dirname, "public", "images");

// Static
app.use(express.static(buildPath));
app.use("/images", express.static(imagesPath));

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
app.get("/images/list", async (req, res) => {
  fs.readdir(imagesPath, (err, files) => {
    if (err) res.json({ error: "Unable to fetch files" });
    res.json({ files });
  });
});

app.on("error", e => console.log("Server error:", e));
app.listen(port, host, () => {
  console.log(`Server is up and running on http://${host}:${port}`);
});
