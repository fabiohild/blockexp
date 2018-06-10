import Web3 from 'web3';

export const web3 = new Web3(window.web3.currentProvider);

export const web3_eth_getBlockNumber = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.getBlockNumber((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_getBlock = i => {
  return new Promise((resolve, reject) => {
    window.web3.eth.getBlock(i, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_hashrate = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.hashrate((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_eth_gasPrice = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.gasPrice((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const web3_net_peerCount = () => {
  return new Promise((resolve, reject) => {
    window.web3.net.peerCount((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// export const web3_eth_getBlock = (block_hash) => {
//   return new Promise((resolve, reject) => {
//     window.web3.eth.getBlock((block_hash, err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(data);
//     });
//   });
// };

// web3.eth.getBlock(block_hash);
