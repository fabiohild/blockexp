import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom'

import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E"))

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: []
      }
  }
  
  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    var tx_hash = this.props.match.params.txHash;
    this.getTxState(tx_hash);
  }
  
  componentWillReceiveProps(nextProps) {
    var tx_hash_old = this.props.match.params.txHash;
    var tx_hash_new = nextProps.match.params.txHash;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (tx_hash_old !== tx_hash_new)
    this.getTxState(tx_hash_new);
  }
  
  getTxState(tx_hash) {
    console.log("Tx hash: " + tx_hash);
    // Use web3 to get the Block object
    var currTxObj = web3.eth.getTransaction(tx_hash)
    currTxObj.currTxReceipt = web3.eth.getTransactionReceipt(tx_hash)
    console.log(currTxObj);
    // Set the Component state
    this.setState({
      tx: currTxObj
    })
  }
  
  render() {
    const tx = this.state.tx;
    const value = parseInt(tx.value, 10) / 1000000000000000000;
//    const difficultyTotal = parseInt(block.totalDifficulty, 10);
    return (
      <div className="Transaction container">
        <br/>
        <h2><i className="far fa-file-alt"/> Transaction Info</h2>
        <div>
          <table>
            <tbody>
              <tr><td className="tdLabel">Tx Hash: </td><td>{tx.hash}</td></tr>
              <tr><td className="tdLabel">Tx Status: </td><td>{tx.currTxReceipt.status}</td></tr>
              <tr><td className="tdLabel">Block Hash: </td><td><Link to={`../block/${tx.blockHash}`}>{tx.blockHash}</Link></td></tr>
              <tr><td className="tdLabel">Block Number: </td><td>{tx.blockNumber}</td></tr>
              <tr><td className="tdLabel">From: </td><td><Link to={`../address/${tx.from}`}>{tx.from}</Link></td></tr>
              <tr><td className="tdLabel">To: </td><td><Link to={`../address/${tx.to}`}>{tx.to}</Link></td></tr>
              <tr><td className="tdLabel">Value: </td><td>{value}</td></tr>
              <tr><td className="tdLabel">Gas: </td><td>{tx.gas}</td></tr>
              <tr><td className="tdLabel">Gas Price: </td><td>{tx.gasPrice.c[0]}</td></tr>
              <tr><td className="tdLabel">Input: </td><td>{tx.input}</td></tr>
              <tr><td className="tdLabel">Nonce: </td><td>{tx.nonce}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Transaction;