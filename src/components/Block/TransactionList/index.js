import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Table } from 'react-bootstrap'
import Constants from './../../Constants';

import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider(Constants.PROVIDER))

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
            <td><Link to={`/tx/${transactions[index].hash}`}><small>{transactions[index].hash}</small></Link></td>
            <td><Link to={`/address/${transactions[index].from}`}><small>{transactions[index].from}</small></Link></td>
            <td><Link to={`/address/${transactions[index].to}`}><small>{transactions[index].to}</small></Link></td>
            <td>{txValue}</td>
          </tr>
        )
      });
    return (
      <div className="TransactionList">
        <div className="card text-white bg-secondary mb-3">
          <div class="card-header">Transactions</div>
          <div class="card-body">
            <Table striped responsive>
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
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
export default TransactionList;

