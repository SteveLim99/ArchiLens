if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  inMemoryStorage = multer.memoryStorage(),
  uploadStrategy = multer({ storage: inMemoryStorage }).single("file"),
  azureStorage = require("azure-storage"),
  blobService = azureStorage.createBlobService(),
  getStream = require("into-stream"),
  sha256 = require("js-sha256"),
  path = require("path"),
  containerName = "file-3d";
const handleError = (err, res) => {
  res.status(500);
  res.render("error", { error: err });
};

const getBlobName = originalName => {
  const fileExtension = path.extname(originalName).toString();
  const identifier = Math.random()
    .toString()
    .replace(/0\./, ""); // remove "0." from start of string
  const newName = sha256(`${identifier}-${originalName}`) + `${fileExtension}`;
  return newName;
};

router.post("/", uploadStrategy, (req, res) => {
  const blobName = getBlobName(req.file.originalname),
    stream = getStream(req.file.buffer),
    streamLength = req.file.buffer.length;
  blobService.createBlockBlobFromStream(
    containerName,
    blobName,
    stream,
    streamLength,
    err => {
      if (err) {
        handleError(err);
        return;
      }
      const uri = blobService.getUrl(containerName, blobName);
      res.send(uri);
    }
  );
});

module.exports = router;
