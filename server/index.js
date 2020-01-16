const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");
const app = express();
const port = process.env.PORT || 8080;
require("../database/mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use("/", publicRoutes);
app.use("/", postRoutes);
app.on("error", e => console.log("Server error:", e));
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
