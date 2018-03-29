import React, {
  Component
} from 'react';
import './style.css';
import Block from './../Block';
import Transaction from './../Transaction';
import Address from './../Address';
import Home from './../Home';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import createHistory from "history/createBrowserHistory"
import { Navbar, Nav, FormGroup, FormControl, Button, NavItem } from 'react-bootstrap';
import Web3 from 'web3';
import Constants from './../Constants';

var web3 = new Web3(new Web3.providers.HttpProvider(Constants.PROVIDER))


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };

    // This binding is necessary to make `this` work in the callback
    this.search = this.search.bind(this);
  }


  search(e) {
    const history = createHistory({forceRefresh: true})
    if (this.state.searchValue.length === 42) {
      // address
      history.push('/address/' + this.state.searchValue);
    } else if (this.state.searchValue.length === 66) {
      // block or tx
      if (web3.eth.getTransaction(this.state.searchValue)) {
        //transaction
        history.push('/tx/' + this.state.searchValue);
      } else {
        // block
        history.push('/block/' + this.state.searchValue);
      }
    } else {
      console.log("nothing")

    }
  }

  render() {
    return ( 
      <div className = "App" >
        <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/"><i className="fab fa-ethereum"/> Block Explorer</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem>
            <Navbar.Form className="form-inline">
              <FormGroup>
                <FormControl type="text" placeholder="Tx, Block or Address" value={this.state.searchValue} onChange={evt => this.updateInputValue(evt)}/>
              </FormGroup>{' '}
              <Button className="btn-secondary" onClick={this.search}><i className="fas fa-search"/></Button>
            </Navbar.Form>
            </NavItem>
          </Nav>
        </Navbar>
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

  updateInputValue(evt) {
    this.setState({
      searchValue: evt.target.value
    });
  }
}
export default App;
