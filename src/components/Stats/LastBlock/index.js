import React, { Component } from 'react'
import './style.css'

class LastBlock extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {}
      }
  }
  
  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    this.getDataState(this.props.data);
  }
  
  getDataState(data) {

    // Set the Component state
    this.setState({
      data: data,
      count: 0
    })
  }
  
  render() {
      var lastBlockTime = this.state.data.blocks[0].timestamp;

      setInterval(() => {
        var now = Math.floor(new Date() / 1000)
        var newCount = now - lastBlockTime
        this.setState({
          count: newCount >= 0 ? newCount : 0
        });
      }, 1000);
    
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