import React, { Component } from 'react';
import './style.css';
import DataDash from './DataDash';
import { Grid, Row, Col } from 'react-bootstrap';

import AvgBlockTime from './AvgBlockTime';
import AvgTxCount from './AvgTxCount';
import BlockStats from './BlockStats';
import BlockMoons from './BlockMoons';
import GasUse from './GasUse';
import LastBlock from './LastBlock';
import LatestBlocks from './LatestBlocks';
import LatestTransactions from './LatestTransactions';
import TxPerSec from './TxPerSec';

import Constants from './../Constants';

import {
  web3,
  web3_eth_getBlockNumber,
  web3_eth_getBlock,
  web3_eth_gasPrice,
  web3_net_peerCount
} from '../../web3Helpers';

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
    };
  }

  async componentWillMount() {
    var curr_block_no = await web3_eth_getBlockNumber();
    this.setState({
      curr_block: curr_block_no
    });
    await this.getBlocks(curr_block_no);
  }

  componentDidMount() {
    this.timer = TimerMixin.setInterval(async () => {
      var curr_block_no = await web3_eth_getBlockNumber;

      if (curr_block_no > this.state.blocks[0].number) {
        const block = await web3_eth_getBlock(curr_block_no, true);
        const hashrate = await web3_eth_getBlock;
        const gasPrice = await web3_eth_gasPrice;
        const peerCount = await web3_net_peerCount;

        if (block) {
          this.state.blocks.pop();
          this.state.blocks.unshift(block);
        }

        this.setState({
          curr_block: curr_block_no,
          hashrate: hashrate,
          gasPrice: gasPrice,
          peerCount: peerCount
        });
      }
    }, 3000);
  }

  componentWillUnmount() {
    TimerMixin.clearTimeout(this.timer);
  }

  async getBlocks(curr_block_no) {
    const blocks = this.state.blocks.slice();
    var max_blocks = Constants.MAX_BLOCKS;
    if (curr_block_no < max_blocks) max_blocks = curr_block_no;
    for (var i = 0; i < max_blocks; i++, curr_block_no--) {
      var currBlockObj = await web3_eth_getBlock(curr_block_no, true);
      if (!currBlockObj.transactions){
        currBlockObj.transactions = [];
      }
      blocks.push(currBlockObj);
    }
    const hashrate = await web3_eth_getBlock;
    const gasPrice = await web3_eth_gasPrice;
    const peerCount = await web3_net_peerCount;
    this.setState({
      blocks: blocks,
      hashrate: hashrate,
      gasPrice: gasPrice,
      peerCount: peerCount
    });
  }

  render() {
    if (!this.state || !this.state.blocks.length) {
      return <pre> loading...</pre>;
    }
    return (
      <div className="Stats">
        <br />
        <Grid>
          <Row className="show-grid">
            <Col xs={6} sm={4}>
              <DataDash data={this.state} />
            </Col>
            <Col xs={6} sm={8}>
              <BlockStats data={this.state} />
              <br />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={4} sm={3}>
              <AvgBlockTime data={this.state} />
            </Col>
            <Col sm={4} md={3}>
              <LastBlock data={this.state} />
            </Col>
            <Col sm={4} md={3}>
              <AvgTxCount data={this.state} />
            </Col>
            <Col sm={4} md={3}>
              <GasUse data={this.state} />
              <TxPerSec data={this.state} />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} sm={12}>
              <BlockMoons data={this.state} />
              <br />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} lg={6}>
              <br />
              <LatestTransactions data={this.state} />
            </Col>
            <Col xs={12} lg={6}>
              <br />
              <LatestBlocks data={this.state} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Stats;
