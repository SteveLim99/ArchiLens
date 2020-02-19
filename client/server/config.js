const env = require("./env/environment");

const config = {};

config.host = process.env.HOST || env.uri;
config.authKey = process.env.AUTH_KEY || env.key;
config.databaseId = "filelist";
config.containerId = "files";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log(
    "WARNING: Disabled checking of self-signed certs. Do not have this code in production."
  );
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(
    `Go to http://localhost:${process.env.PORT || "3001"} to try the sample.`
  );
}

module.exports = config;
