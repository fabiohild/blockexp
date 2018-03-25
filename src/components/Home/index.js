import React, { Component } from 'react'
import './style.css'
import Stats from './../Stats';

class Home extends Component {

  render() {
      return (
          <div className="Home container">
              <Stats/>
          </div>
      );
  }
}

export default Home;