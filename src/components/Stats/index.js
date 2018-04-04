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
import Constants from './../Constants';
var web3 = new Web3(new Web3.providers.HttpProvider(Constants.PROVIDER))

var TimerMixin = require('react-timer-mixin');

class Stats extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      curr_block: null,
      hashrate: null,
      gasPrice: null,
      peerCount: null
    }
  }

  componentWillMount() {
    var curr_block_no = web3.eth.blockNumber;
    this.setState({
      curr_block: curr_block_no
    });
    this.getBlocks(curr_block_no);
  }

  componentDidMount(){
    this.timer = TimerMixin.setInterval( () => { 
        var curr_block_no = web3.eth.blockNumber;

        if (curr_block_no > this.state.blocks[0].number) {
          const block = web3.eth.getBlock(curr_block_no, true);
          const hashrate = web3.eth.hashrate;
          const gasPrice = web3.eth.gasPrice;
          const peerCount = web3.net.peerCount;
          
          if (block){
            this.state.blocks.pop();
            this.state.blocks.unshift(block);
          }

          this.setState({
            curr_block: curr_block_no,
            hashrate: hashrate,
            gasPrice: gasPrice,
            peerCount: peerCount
        })
        }

     }, 3000);
  } 

  componentWillUnmount() {
    TimerMixin.clearTimeout(this.timer);
  }

  getBlocks(curr_block_no) {
    const blocks = this.state.blocks.slice();
    var max_blocks = Constants.MAX_BLOCKS;
    if (curr_block_no < max_blocks) max_blocks = curr_block_no;
    for (var i = 0; i < max_blocks; i++, curr_block_no--) {
      var currBlockObj = web3.eth.getBlock(curr_block_no, true);
      blocks.push(currBlockObj);
    }
    const hashrate = web3.eth.hashrate;
    const gasPrice = web3.eth.gasPrice;
    const peerCount = web3.net.peerCount;
    this.setState({
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