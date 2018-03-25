import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E"))

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
      }
  }
  
  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    this.getTransactionListState(this.props.block);
  }
  
  componentWillReceiveProps(nextProps) {
    var props_old = this.props.block;
    var props_new = nextProps.block;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (props_old !== props_new)
    this.getTransactionListState(props_new);
  }
  
  getTransactionListState(block) {
    var currblock = web3.eth.getBlock(block, true)
    var currListObj = currblock.transactions
    
    console.log(currListObj);
    // Set the Component state
    this.setState({
      transactions: currListObj
    })
  }
  
  render() {
    var transactions = this.state.transactions;
    var tableRows = [];
      _.each(transactions, (value, index) => {
        var txValue = parseInt(transactions[index].value, 10) / 1000000000000000000;
        tableRows.push(
          <tr key={transactions[index].hash}>
            <td><Link to={`/tx/${transactions[index].hash}`}>{transactions[index].hash}</Link></td>
            <td><Link to={`/address/${transactions[index].from}`}>{transactions[index].from}</Link></td>
            <td><Link to={`/address/${transactions[index].to}`}>{transactions[index].to}</Link></td>
            <td>{txValue}</td>
          </tr>
        )
      });
    return (
      <div className="TransactionList">
        <h2>Transactions</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default TransactionList;