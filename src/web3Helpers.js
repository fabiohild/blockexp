import Web3 from 'web3';

import Constants from './Constants';

let provider;

if (window.web3 && window.web3.currentProvider) {
  provider = window.web3.currentProvider;
} else {
  provider = new Web3.providers.HttpProvider(Constants.PROVIDER);
}

export const web3 = new Web3(provider);

export const web3_eth_getBlockNumber = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_getBlock = (i, opt = true) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBlock(i, opt, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_hashrate = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getHashrate((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_gasPrice = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getGasPrice((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_net_peerCount = () => {
  return new Promise((resolve, reject) => {
    web3.net.getPeerCount((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_getBalance = addr => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(addr, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_getTransactionCount = addr => {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(addr, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_getTransactionByHash = hash => {
  return new Promise((resolve, reject) => {
    web3.eth.getTransaction(hash, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_getTransactionReceipt = hash => {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(hash, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
