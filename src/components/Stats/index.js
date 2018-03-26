import React, { Component } from 'react'
import './style.css'
import DataDash from './DataDash';
import BlockStats from './BlockStats';
import LatestBlocks from './LatestBlocks';
import LatestTransactions from './LatestTransactions';
import BlockMoons from './BlockMoons';
import AvgBlockTime from './AvgBlockTime';
import AvgTxCount from './AvgTxCount';
import LastBlock from './LastBlock';
import GasUse from './GasUse';
import { Grid, Row, Col } from 'react-bootstrap'

import Web3 from 'web3'
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E"))

class Stats extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      block_ids: [],
      block_hashes: [],
      blocks: [],
      curr_block: null,
      hashrate: null,
    }
  }

  componentWillMount() {
    var curr_block_no = web3.eth.blockNumber;
    this.setState({
      curr_block: curr_block_no
    });
    this.getBlocks(curr_block_no);
  }

  getBlocks(curr_block_no) {
    const block_ids = this.state.block_ids.slice();
    const block_hashes = this.state.block_hashes.slice();
    const blocks = this.state.blocks.slice();
    var max_blocks = 10;
    if (curr_block_no < max_blocks) max_blocks = curr_block_no;
    for (var i = 0; i < max_blocks; i++, curr_block_no--) {
      var currBlockObj = web3.eth.getBlock(curr_block_no, true);
      block_ids.push(currBlockObj.number);
      block_hashes.push(currBlockObj.hash);
      blocks.push(currBlockObj);
    }
    var hashrate = web3.eth.hashrate;
    var gasPrice = web3.eth.gasPrice;
    var peerCount = web3.net.peerCount;
    this.setState({
      block_ids: block_ids,
      block_hashes: block_hashes,
      blocks: blocks,
      hashrate: hashrate,
      gasPrice: gasPrice,
      peerCount: peerCount
    })
  }

  render() {
      return (
          <div className="Stats">
              <br/>
              <Grid>

                <Row className="show-grid">
                  <Col xs={6} sm={4}>
                    <DataDash data={this.state}/>
                  </Col>
                  <Col xs={6} sm={8}>
                    <BlockStats data={this.state}/>
                    <br/>
                  </Col>
                </Row>

                <Row className="show-grid">
                  <Col xs={4} sm={3}>
                    <AvgBlockTime data={this.state}/>
                  </Col>
                  <Col sm={4} md={3}>
                    <LastBlock data={this.state}/>
                  </Col>
                  <Col sm={4} md={3}>
                    <AvgTxCount data={this.state}/>
                  </Col>
                  <Col sm={4} md={3}>
                    <GasUse data={this.state}/>
                  </Col>
                </Row>

                <Row className="show-grid">
                  <Col xs={12} sm={12}>
                    <BlockMoons data={this.state}/>
                    <br/>
                  </Col>
                </Row>



                <Row className="show-grid">
                  <Col xs={12} lg={6}>
                    <br/>
                    <LatestTransactions data={this.state}/>
                  </Col>
                  <Col xs={12} lg={6}>
                    <br/>
                    <LatestBlocks data={this.state}/>
                  </Col>
                </Row>
              </Grid>
          </div>
      );
  }
}

export default Stats;