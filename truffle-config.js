const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
  "border can toe educate dress gadget plastic giggle bargain pitch habit voice";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    live: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/v3/03251aeba6bf47299714485f8e219a31"
        );
      },
      network_id: 3
    }
  }
};
