const AWS = require("aws-sdk");

function getDestination(req, file, cb) {
  cb(
    null,
    `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}/images/`
  );
}

function AWS_S3(opts) {
  this.destination = (opts.destination || getDestination);
}

AWS_S3.prototype._handleFile = function _handleFile(req, file, cb) {
  this.getDestination(req, file, function(err, path) {
    if (err) cb(err);

    console.log("storage file", file);
    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: req.file.originalname,
      Expires: 60,
      ContentType: req.file.mimetype,
      ACL: "public-read"
    };

    // save to S3
    s3.getSignedUrl("putObject", params, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log("data", data);
    });
    // when done, call cb
  });
};

AWS_S3.prototype._removeFile = function _removeFile(req, file, cb) {
  // possible remove from s3
};

module.exports = function(opts) {
  return new AWS_S3(opts);
};
