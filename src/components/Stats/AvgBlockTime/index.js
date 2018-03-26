import React, { Component } from 'react'
import './style.css'
import _ from 'lodash'

class AvgBlockTime extends Component {
  
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
      data: data
    })
  }
  
  render() {
      var data = this.state.data.blocks;
      var times = []
      
      _.each(data, (value, index) => {
        if (index !== data.length-1) times.push(data[index].timestamp - data[index+1].timestamp)
      });
      const add = (a, b) => a + b
      // use reduce to sum our array
      const sum = times.reduce(add)
      var average = Math.round(sum/times.length)
    
      return (
          <div className="AvgBlockTime">
            <div className="card border-secondary mb-3">
                <div className="card-header" style={{textAlign: "center"}}>Avg Block Time</div>
                <div className="card-body">
                    <h1 className="card-title" style={{textAlign: "center"}}><i className="fas fa-stopwatch"/> {average}s</h1>
                </div>
            </div>
          </div>
      );
  }
}

export default AvgBlockTime;