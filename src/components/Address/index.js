import React, { Component } from 'react';
import './style.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { web3, web3_eth_getBalance, web3_eth_getTransactionCount } from '../../web3Helpers';
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressData: [],
      transactionData: []
    };
  }

  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    var address = this.props.match.params.address;
    this.getAddressState(address);
  }

  async componentWillReceiveProps(nextProps) {
    var address_old = this.props.match.params.address;
    var address_new = nextProps.match.params.address;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (address_old !== address_new) await this.getAddressState(address_new);
  }

  async getAddressState(address) {
    // Use web3 to get the Block object
    var currAddressObj = {};
    currAddressObj.address = address;
    currAddressObj.balance =
      parseInt(await web3_eth_getBalance(address), 10) / 1000000000000000000;
    currAddressObj.txCount = parseInt(
      await web3_eth_getTransactionCount(address),
      10
    );

    // getting transactions from address - does not work with Infura
    let template = this;
    web3.eth
      .filter({
        address: address,
        fromBlock: 1,
        toBlock: 'latest'
      })
      .get(function(err, result) {
        template.setState({
          transactionData: result
        });
      });

    // Set the Component state
    this.setState({
      address: currAddressObj
    });
  }

  render() {
    const address = this.state.address;

    if (!address) {
      return <pre>loading</pre>;
    }
    var transactions = this.state.transactionData;
    var tableRows = [];
    _.each(transactions, (value, index) => {
      tableRows.push(
        <tr key={value.transactionHash + value.logIndex}>
          <td>
            <Link to={`/block/${value.blockHash}`}>
              <small>{value.blockNumber}</small>
            </Link>
          </td>
          <td>
            <Link to={`/tx/${value.transactionHash}`}>
              <small>{value.transactionHash}</small>
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <div className="Address container">
        <br />
        <h2>
          <i className="fas fa-key" /> Address Info
        </h2>
        <div>
          <table>
            <tbody>
              <tr>
                <td className="tdLabel">Address: </td>
                <td>{address.address}</td>
              </tr>
              <tr>
                <td className="tdLabel">Balance: </td>
                <td>{address.balance}</td>
              </tr>
              <tr>
                <td className="tdLabel">Tx Count: </td>
                <td>{address.txCount}</td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
        {tableRows.length > 0 ? (
          <div className="TransactionList">
            <div className="card border-secondary mb-3">
              <div className="card-header">Transactions</div>
              <div className="card-body">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Block no.</th>
                      <th>Tx Hash</th>
                    </tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }
}
export default Address;
