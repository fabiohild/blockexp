import React, { Component } from 'react'
import './style.css'
var TimerMixin = require('react-timer-mixin');

class LastBlock extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      count: 0
      }
  }
  
  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    this.getDataState(this.props.data);
  }

  componentDidMount(){
    this.timer = TimerMixin.setInterval(() => {
      var now = Math.floor(new Date() / 1000)
      var newCount = now - this.state.lastBlockTime
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
    }, 1000);
  } 

  componentWillReceiveProps(nextProps) {
    var props_old = this.props.data;
    var props_new = nextProps.data;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (props_old !== props_new)
    this.getDataState(props_new);
  }
  
  getDataState(data) {

    // Set the Component state
    this.setState({
      // lastBlockTime: data.blocks[0].timestamp,
      count: 0
    })
  }

  componentWillUnmount() {
    TimerMixin.clearTimeout(this.timer);
  }
  
  render() {
    
      return (
          <div className="LastBlock">
            <div className="card border-secondary mb-3">
              <div className="card-header" style={{textAlign: "center"}}>Last Block</div>
              <div className="card-body">
                <h1 className="card-title" style={{textAlign: "center"}}><i className="fas fa-hourglass-half"/> {this.state.count}s</h1>
              </div>
            </div>
          </div>
      );
  }
}

export default LastBlock;