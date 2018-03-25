import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import './style.css'
import Stats from './../Stats';

import Web3 from 'web3'
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E"))

class Home extends Component {

  render() {
      return (
          <div className="Home">
              <Stats/>
          </div>
      );
  }
}

export default Home;