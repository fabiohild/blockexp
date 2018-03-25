import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './style.css';
import Block from './../Block';
import Transaction from './../Transaction';
import Address from './../Address';
import Home from './../Home';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return ( 
      <div className = "App" >
        <div className = "App-header">
          <h2><img src = {logo} className = "App-logo" alt = "logo" / > <a href="/" className = "App-title"> Block Explorer </a></h2>
        </div > 
        <div className = "App-nav" > { 
          <Router>
            <div>          
              <Route exact path="/" component={Home}/>
              <Route exact path="/block" render={() => (
                <h3>Please select a blockHash.</h3>
              )}/>
              <Route path="/block/:blockHash" component={Block}/>
              <Route exact path="/tx" render={() => (
                <h3>Please select a transaction hash.</h3>
              )}/>
              <Route path="/tx/:txHash" component={Transaction}/>
              <Route exact path="/address" render={() => (
                <h3>Please select an address.</h3>
              )}/>
              <Route path="/address/:address" component={Address}/>
            </div>
          </Router>
        } 
        </div> 
      </div>
    );
  }
}
export default App;
