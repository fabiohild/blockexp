import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import './style.css'

class LatestBlocks extends Component {
  
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
      _.each(data.block_ids, (value, index) => {
        tableRows.push(
          <tr key={data.block_hashes[index]}>
            <td className="tdCenter"><small>{data.block_ids[index]}</small></td>
            <td><small><Link to={`/block/${data.block_hashes[index]}`}>{data.block_hashes[index]}</Link></small></td>
          </tr>
        )
      });
      return (
          <div className="LatestBlocks">
              <h2>Latest Blocks</h2>
              <table>
                <thead><tr>
                  <th><i className="fa fa-cube"/> no.</th>
                  <th>Hash</th>
                </tr></thead>
                <tbody>
                  {tableRows}
                </tbody>
              </table>
          </div>
      );
  }
}

export default LatestBlocks;