import React, { Component } from 'react';
import './login.css';
import {adminLogin,login} from '../../../features/actions';
import { connect } from 'react-redux';

const home = require('../../../images/home.png');

class Login extends Component {


    constructor(props) {
        super();
        this.login = React.createRef();
        this.pass = React.createRef();
    }

    handleLogin = (body) => {

        const requestBody = {
            login: body.login,
            pass: body.pass
        };
         
      this.props.login(requestBody);
       
    }

  handleHome = () => {
    window.location.href = '/';
  }

    handleSign = (e) => {
        e.preventDefault();
        let requestBody = {
            login: this.login.current.value,
            pass: this.pass.current.value
        }
        this.handleLogin(requestBody);

    }

    render() {
        const {  loading  } = this.props.data;
       
        // if (error) {
        //   return <div>Error! {error.message}</div>;
        // }
     



        return (
            <div className="login-container">
           
                <div className="header"><span>Admin panel</span> <button className="home-button" onClick={this.handleHome}><img src={home}/></button></div>

                <div className="admin-login-form">

                    <label htmlFor="login">Login</label>
                    <input ref={this.login} id="login" type="text" />
                    <label htmlFor="password" >Password</label>
                    <input ref={this.pass} id="password" type="password" />
          
                    <button onClick={this.handleSign} type="submit">Sign in</button>

                   { loading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                </div>
               
               

            </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
      data: state.newReducer
    };
  }
  
  
  export default connect(mapStateToProps,{adminLogin,login})(Login)
