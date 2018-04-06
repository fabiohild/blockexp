import React, { Component } from 'react'
import './style.css'
import _ from 'lodash'

class TxPerSec extends Component {
  
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
      var txTotal = 0
      
      _.each(data, (value, index) => {
        txTotal += data[index].transactions.length
      });
      var average = Math.round(txTotal / ( data[0].timestamp - data[9].timestamp ) )

    
      return (
          <div className="TxPerSec">
            <div className="card border-secondary mb-3">
                <div className="card-header" style={{textAlign: "center"}}>Tx / Sec</div>
                <div className="card-body">
                    <h1 className="card-title" style={{textAlign: "center"}}><i className="fas fa-fire"/> {average}</h1>
                </div>
            </div>
          </div>
      );
  }
}

export default TxPerSec;
