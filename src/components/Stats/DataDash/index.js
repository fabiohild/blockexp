import React, { Component } from 'react';
import './style.css';

class DataDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    this.getDataState(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    var props_old = this.props.data;
    var props_new = nextProps.data;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (props_old !== props_new) this.getDataState(props_new);
  }

  getDataState(data) {
    // Set the Component state
    this.setState({
      data: data
    });
  }

  render() {
    if (!this.state.data) {
      return;
    }
    let data = this.state.data;

    console.log(data)

    // if (!data.gasPrice) {
    //   data = {
    //     ...data,
    //     gasPrice: 1337
    //   };
    // }
    // data = {
    //   blocks: [{
    //     difficulty: 1,
    //     gasLimit: 10
    //   }],
    //   gasPrice: '10',
    // }

    const difficulty = parseInt(data.blocks[0].difficulty, 10);
    const gasPrice = parseInt(data.gasPrice, 10);
    const gasLimit = parseInt(data.blocks[0].gasLimit, 10);
    return (
      <div className="DataDash">
        <h2>
          <i className="fas fa-link" /> Stats
        </h2>
        <div>
          <table>
            <tbody>
              <tr>
                <td className="tdLabel">Height: </td>
                <td>{data.curr_block}</td>
              </tr>
              <tr>
                <td className="tdLabel">Timestamp: </td>
                <td>{data.blocks[0].timestamp}</td>
              </tr>
              <tr>
                <td className="tdLabel">Hashrate: </td>
                <td>{data.hashrate}</td>
              </tr>
              <tr>
                <td className="tdLabel">Gas Price: </td>
                <td>{gasPrice}</td>
              </tr>
              <tr>
                <td className="tdLabel">Gas Limit: </td>
                <td>{gasLimit}</td>
              </tr>
              <tr>
                <td className="tdLabel">Dificulty: </td>
                <td>{difficulty}</td>
              </tr>
              <tr>
                <td className="tdLabel">Peer Count: </td>
                <td>{data.peerCount}</td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      </div>
    );
  }
}

export default DataDash;
