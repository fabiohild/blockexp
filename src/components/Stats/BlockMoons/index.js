import React, { Component } from 'react'
import './style.css'
import {ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip} from 'recharts';

class BlockMoons extends Component {
  
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
        number: element.number,
        timestamp: element.timestamp,
        index: 1,
        transactions: element.transactions.length,
        gasPrice: element.gasUsed,
        size: element.size
      }
      chartData.push(data)
    });
    chartData.reverse();
    
    const parseDomain = () => {
      return [
        0,
        Math.max.apply(null, [
          ...chartData.map(entry => entry.transactions)
        ])
      ];
    };
    const domain = parseDomain();
    const range = [0, 4000];
  
    function formatXAxis(tickItem) {
      var date = new Date(tickItem*1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      }

    return (
      <div className="BlockMoons">
        <div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart width={900} height={120} margin={{top: 40, right: 0, bottom: 0, left: 0}}>
                <XAxis type="number" height={20} domain={['auto', 'auto']} dataKey="timestamp" name="Timestamp" tick={{strokeWidth: 1}} tickFormatter={formatXAxis} />
                <YAxis type="number" dataKey="size" name="Block Size" height={10} width={80} tick={false} tickLine={false} axisLine={false} />
                <ZAxis type="number" dataKey="transactions" name="Transactions" domain={domain} range={range} />
                <Tooltip cursor={false} wrapperStyle={{ background: "#303030", border: 0}} itemStyle={{ color: "#8884d8" }} content={this.renderTooltip} />
                <Scatter data={chartData} shape="square" fill='#8884d8'/>
          </ScatterChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default BlockMoons;