import React, { Component } from 'react';
import './style.css';
import Constants from './../Constants';
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider(Constants.PROVIDER))

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressData: [],
      transactionData: []
      }
  }
  
  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    var address = this.props.match.params.address;
    this.getAddressState(address);
  }
  
  componentWillReceiveProps(nextProps) {
    var address_old = this.props.match.params.address;
    var address_new = nextProps.match.params.address;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (address_old !== address_new)
    this.getAddressState(address_new);
  }
  
  getAddressState(address) {
    // Use web3 to get the Block object
    var currAddressObj = {}
    currAddressObj.address = address;
    currAddressObj.balance = parseInt(web3.eth.getBalance(address), 10) / 1000000000000000000; 
    currAddressObj.txCount = parseInt(web3.eth.getTransactionCount(address), 10); 
    
    // getting transactions from address - does not work with Infura
    let template = this;
    web3.eth.filter({
        address: address,
        fromBlock: 1,
        toBlock: 'latest'
        }).get(function (err, result) {
          template.setState({
            transactionData: result
          })
        })

    // Set the Component state
    this.setState({
      address: currAddressObj
    })
  }
  
  render() {
    const address = this.state.address;
    var transactions = this.state.transactionData;
    var tableRows = [];
      _.each(transactions, (value, index) => {
        tableRows.push(
          <tr key={value.transactionHash + value.logIndex}>
            <td><Link to={`/block/${value.blockHash}`}><small>{value.blockNumber}</small></Link></td>
            <td><Link to={`/tx/${value.transactionHash}`}><small>{value.transactionHash}</small></Link></td>
          </tr>
        )
      });
    return (
      <div className="Address container">
        <br/>
        <h2><i className="fas fa-key"/> Address Info</h2>
        <div>
          <table>
            <tbody>
              <tr><td className="tdLabel">Address: </td><td>{address.address}</td></tr>
              <tr><td className="tdLabel">Balance: </td><td>{address.balance}</td></tr>
              <tr><td className="tdLabel">Tx Count: </td><td>{address.txCount}</td></tr>
            </tbody>
          </table>
          <br/>
        </div>
        { tableRows.length > 0 ?
          <div className="TransactionList">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Transactions</div>
              <div className="card-body">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Block no.</th>
                      <th>Tx Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
            :
            <h2></h2>
        }

      </div>
    );
  }
}
export default Address;