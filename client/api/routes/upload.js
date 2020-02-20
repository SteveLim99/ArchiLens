if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const express = require("express"),
  router = express.Router(),
  azureStorage = require("azure-storage"),
  blobService = azureStorage.createBlobService(),
  containerName = "file-3d",
  config = require("../config");
