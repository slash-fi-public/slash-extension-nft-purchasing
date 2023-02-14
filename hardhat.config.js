require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require('hardhat-abi-exporter');
require('@nomiclabs/hardhat-ethers');

const accounts = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {},
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: [accounts],
    },
    goerli: {
      url: process.env.GOERLI_NODE_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      accounts: [accounts],
      chainId: 97,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    }
  },
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
};
