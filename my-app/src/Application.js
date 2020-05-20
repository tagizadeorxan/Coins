import React, {Component} from 'react';
import Login from './components/Admin/login';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Main from './components/Admin/main';
import './index.css';
import Edit from './components/Admin/main/edit';
import HomePage from './components/Home';
import EachCoin from './components/Home/Filter/eachcoin';
import Buy from './components/Home/Buy';


class Application extends Component {
    render() {
        return (
            <Router>
                 <Route exact path='/buy'><Buy/></Route>
                <Route exact path='/'><HomePage/></Route>
                <Route exact path = '/admin/panel'><Main/></Route>
               <Route exact path = '/admin'><Login/></Route>
              <Route exact path = '/admin/panel/edit/:id' component={Edit}></Route>
              <Route exact path='/eachcoin/:id' component={EachCoin}></Route>
            </Router>
        )
    }
}

export default Application;