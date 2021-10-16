const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");

const imagesPath = path.join(__dirname, "..", "public", "images");

router.get("/all", async (req, res) => {
  // if (process.env.NODE_ENV === "development") {
  //   fs.readdir(imagesPath, (err, files) => {
  //     if (err) res.json({ error: "Unable to fetch files" });
  //     res.json({ files });
  //   });
  // } else {
  // AWS S3 Bucket in production
  AWS.config.region = process.env.AWS_REGION || "eu-north-1";
  const s3 = new AWS.S3();
  s3.listObjectsV2(
    { Bucket: process.env.S3_BUCKET, Prefix: "images/" },
    (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        const files = [];

        for (let image of data.Contents) {
          const fileName = image.Key.replace("images/", "");
          if (fileName) files.push(fileName);
        }

        res.json({
          files,
          url: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/images/`
        });
      }
    }
  );
  // }
});

module.exports = router;
