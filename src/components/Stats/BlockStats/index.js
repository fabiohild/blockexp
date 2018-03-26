import React, { Component } from 'react'
import './style.css'
import { ResponsiveContainer, LineChart, XAxis, Legend, Tooltip, Line } from 'recharts';

class BlockStats extends Component {
  
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
    const data = this.state.data;  
    var chartData = []
    data.blocks.forEach(element => {
      var data = {
        height: element.number,
        transactions: element.transactions.length,
        size: element.size,
        gasPrice: element.gasUsed
      }
      chartData.push(data)
    });
    chartData.reverse();
    

    return (
      <div className="BlockStats">
        <h2>Block Stats</h2>
        <div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            width={600}
            height={250}
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="height" />
            
            <Tooltip cursor={false} wrapperStyle={{ background: "#303030", border: 0}} />
            <Legend />
            <Line type="monotone" dataKey="transactions" stroke="#E74C3C" strokeWidth={2} yAxisId={1} dot={{ stroke: '#E74C3C', fill: '#E74C3C'  }} activeDot={{ stroke: '#E74C3C', strokeWidth: 2, r: 4 }} name="Transactions"/>
            <Line type="monotone" dataKey="size" stroke="#00bc8c" strokeWidth={2} yAxisId={2} dot={{ stroke: '#00bc8c', fill: '#00bc8c'  }} activeDot={{ stroke: '#00bc8c', strokeWidth: 2, r: 4 }} name="Size"/>
            <Line type="monotone" dataKey="gasPrice" stroke="#F39C12" strokeWidth={2} yAxisId={3} dot={{ stroke: '#F39C12', fill: '#F39C12'  }} activeDot={{ stroke: '#F39C12', strokeWidth: 2, r: 4 }} name="Gas Price"/>
          </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default BlockStats;