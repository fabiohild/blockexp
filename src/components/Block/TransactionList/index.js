import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

import { web3_eth_getBlock } from '../../../web3Helpers';

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    await this.getTransactionListState(this.props.block);
  }

  async getTransactionListState(block) {
    var currblock = await web3_eth_getBlock(block, true);
    var currListObj = currblock.transactions;

    // Set the Component state
    this.setState({
      transactions: currListObj
    });
  }

  render() {
    var transactions = this.state.transactions;

    if (!transactions){
      return <pre>loading</pre>
    }
    var tableRows = [];
    _.each(transactions, (value, index) => {
      var txValue = 
        parseInt(transactions[index].value, 10) / 1000000000000000000;
      tableRows.push(
        <tr key={transactions[index].hash}>
          <td>
            <Link to={`/tx/${transactions[index].hash}`}>
              <small>{transactions[index].hash}</small>
            </Link>
          </td>
          <td>
            <Link to={`/address/${transactions[index].from}`}>
              <small>{transactions[index].from}</small>
            </Link>
          </td>
          <td>
            <Link to={`/address/${transactions[index].to}`}>
              <small>{transactions[index].to}</small>
            </Link>
          </td>
          <td>{txValue}</td>
        </tr>
      );
    });
    return (
      <div className="TransactionList">
        <div className="card border-secondary mb-3">
          <div className="card-header">Transactions</div>
          <div className="card-body">
            <Table striped responsive>
              <thead>
                <tr>
                  <th>Tx Hash</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
export default TransactionList;
