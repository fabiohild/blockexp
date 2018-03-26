import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import './style.css'

class LatestTransactions extends Component {
  
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
      var data = this.state.data;
      var tableRows = [];

      _.each(data.blocks[0].transactions, (value, index) => {
        if (index > 9)
            return false;
        tableRows.push(
          <tr key={value.hash}>
            <td><small><Link to={`/tx/${value.hash}`}>{value.hash}</Link></small></td>
          </tr>
        )
      });
      return (
          <div className="LatestTransactions">
              <h2>Latest Transactions</h2>
              <table>
                <thead><tr>
                  <th>Tx Hash</th>
                </tr></thead>
                <tbody>
                  {tableRows}
                </tbody>
              </table>
          </div>
      );
  }
}

export default LatestTransactions;