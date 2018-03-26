import React, { Component } from 'react'
import './style.css'
import _ from 'lodash'
import {ResponsiveContainer, AreaChart, Area, Tooltip, XAxis} from 'recharts';

class GasUse extends Component {
  
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
      var chartData = []
      _.each(data, (value, index) => {
        chartData.push({
            block: data[index].number,
            a: data[index].gasLimit - data[index].gasUsed,
            b: data[index].gasUsed
        })
      });
      chartData.reverse()
      
      return (
          <div className="GasUse">
            <div className="card border-secondary mb-3">
                <div className="card-header" style={{textAlign: "center"}}>Gas Usage</div>
                <div className="card-body">
                <ResponsiveContainer width="100%" height={58}>
                <AreaChart width={600} height={400} data={chartData} stackOffset="expand" margin={{top: 0, right: 0, left: 0, bottom: 0}} >
                <Tooltip cursor={false} wrapperStyle={{ background: "#303030", border: 0}} coordinate={{ x: 100, y: 140 }} offset={50} />
                <XAxis dataKey="block" tickCount={0} tickSize={0} tick={false} axisLine={false} hide={true}/>
                <Area type='monotone' dataKey='b' name="Gas Used" stackId="1" stroke='#E74C3C' fill='#E74C3C' />
                <Area type='monotone' dataKey='a' name="Unused Gas Limit" stackId="1" stroke='#00bc8c' fill='#00bc8c' />
                </AreaChart>
                </ResponsiveContainer>
                </div>
            </div>

          </div>
      );
  }
}

export default GasUse;
