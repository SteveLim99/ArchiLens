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
    const tmp = "index testing v0.0.1";
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

    if (filterName == "test.STEP") {
      console.log(viewData.thumbnails);
    } else {
      var test = [];
      for (var blob of data.entries) {
        // if (blob["name"] == filterName) {
        test += blob["name"];
        // console.log("go home");
        //   // tmp += blob["name "];
        // }
      }
    }
    res.send(test);
  });
});

module.exports = router;
