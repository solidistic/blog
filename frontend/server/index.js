const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";

const buildPath = path.join(__dirname, "..", "build");
const imagesPath = path.join(__dirname, "..", "build", "images");

const origin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";

// Static
app.use(express.static(buildPath));
app.use("/images", express.static(imagesPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.on("error", (e) => console.log("Server error:", e));
app.listen(port, host, () => {
  console.log("Allowed origin -- ", process.env.ALLOWED_ORIGIN);
  console.log(
    `Server is up and running on ${
      process.env.NODE_ENV === "development" ? "http" : "https"
    }://${host}:${port}`
  );
});
