import React, { Component } from 'react';
import { adminLogout, checkToken } from '../../../features/actions';
import { connect } from 'react-redux';
import './main.css';
import Add from './add';
import Search from './search';

const logout = require('../../../images/logout.png');


class Main extends Component {

    state = { add: false, edit: false, search: true };

    componentDidMount() {
        this.props.checkToken(this.props.state.newReducer.token);
    }

    // when admin wants to exit and remove login
    handleLogout = () => {
        this.props.adminLogout();
        window.location.href = '/admin'
    }

    //view menu
    handleMenu = (type) => {
        this.setState({ [type]: !this.state[type], search: !this.state.search })
    }


    render() {

        let { add, edit, search } = this.state;
        let { tokenloading } = this.props.state.newReducer;

        if (tokenloading) {
            return <p>Loading...</p>
        } else if (tokenloading === null) {
            window.location.href = '/'

        } else {
            return (

                <div className="admin-panel-container">
                    <div>
                        <div className="admin-panel-header">
                            <div className="header"><span>Admin panel</span></div>
                            <button  className="logout-button" onClick={this.handleLogout}><img   alt="logout" src={logout}/></button>
                        </div>
                    </div>
                    {search && <Search handleMenu={this.handleMenu} />}
                    {add && <Add handleMenu={this.handleMenu} />}
                </div>



            )
        }




    }
}

let mapStateToProps = (state) => {
    return {
        state
    };
}


export default connect(mapStateToProps, { adminLogout, checkToken })(Main)




