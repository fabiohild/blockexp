import React, { Component } from 'react';
import './style.css';

import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E"))

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressData: []
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
    console.log("Address: " + address);
    // Use web3 to get the Block object
    var currAddressObj = {}
    currAddressObj.address = address;
    currAddressObj.balance = parseInt(web3.eth.getBalance(address), 10) / 1000000000000000000; 
    currAddressObj.txCount = parseInt(web3.eth.getTransactionCount(address), 10); 
    
    // getting transactions from address
    web3.eth.filter({
        address: address,
        fromBlock: 1,
        toBlock: 'latest'
        }).get(function (err, result) {
         console.log(result)
        })

    console.log(currAddressObj);
    // Set the Component state
    this.setState({
      address: currAddressObj
    })
  }
  
  render() {
    const address = this.state.address;
    return (
      <div className="Address container">
        <br/>
        <h2>Address Info</h2>
        <div>
          <table>
            <tbody>
              <tr><td className="tdLabel">Address: </td><td>{address.address}</td></tr>
              <tr><td className="tdLabel">Balance: </td><td>{address.balance}</td></tr>
              <tr><td className="tdLabel">Tx Count: </td><td>{address.txCount}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Address;