if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express"),
  router = express.Router(),
  azureStorage = require("azure-storage"),
  blobService = azureStorage.createBlobService(),
  containerName = "file-3d",
  config = require("../config");
var filterName = "";
router.get("/", (req, res, next) => {
  blobService.listBlobsSegmented(containerName, null, (err, data) => {
    let viewData;

    if (err) {
      viewData = {
        title: "Error",
        viewName: "error",
        message: "There was an error contacting the blob storage container.",
        error: err
      };

      res.status(500);
    } else {
      viewData = {
        title: "Home",
        viewName: "index",
        accountName: config.getStorageAccountName(),
        containerName: containerName
      };

      if (data.entries.length) {
        viewData.thumbnails = data.entries;
      }
    }

    if (filterName == "") {
      console.log(viewData.thumbnails);
    } else {
      for (var blob of data.entries) {
        if (blob["name"] == filterName) {
          console.log(blob);
          console.log("go home");
        }
      }
    }
  });
});

module.exports = router;