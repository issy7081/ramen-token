require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    robinhood_testnet: {
      url: "https://rpc.testnet.chain.robinhood.com",
      chainId: 46630,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      robinhood_testnet: "abc" // Explorer requires any non-empty string as API key
    },
    customChains: [
      {
        network: "robinhood_testnet",
        chainId: 46630,
        urls: {
          apiURL: "https://explorer.testnet.chain.robinhood.com/api",
          browserURL: "https://explorer.testnet.chain.robinhood.com"
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  }
};
