import React, { Component } from 'react';
import './login.css';
import { adminLogin, login } from '../../../features/actions';
import { connect } from 'react-redux';

const home = require('../../../images/home.png');

class Login extends Component {


    constructor(props) {
        super();
        this.login = React.createRef();
        this.pass = React.createRef();
    }

    //sending login credential to action named login
    handleLogin = (body) => {
        const requestBody = {
            login: body.login,
            pass: body.pass
        };

        this.props.login(requestBody);
    }

    //returning home if admin wants to exit from admin panel
    handleHome = () => {
        window.location.href = '/';
    }

    //checking credential
    handleSign = (e) => {
        e.preventDefault();
        let requestBody = {
            login: this.login.current.value,
            pass: this.pass.current.value
        }
        this.handleLogin(requestBody);
    }

    render() {
        const { loading } = this.props.data;

        return (
            <div className="login-container">

                <div className="header"><span>Admin panel</span> <button className="home-button" onClick={this.handleHome}><img alt="home" src={home} /></button></div>

                <div className="admin-login-form">

                    <label htmlFor="login">Login</label>
                    <input ref={this.login} id="login" type="text" />
                    <label htmlFor="password" >Password</label>
                    <input ref={this.pass} id="password" type="password" />

                    <button onClick={this.handleSign} type="submit">Sign in</button>

                    {loading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
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


export default connect(mapStateToProps, { adminLogin, login })(Login)
