import React, { Component } from 'react';
import './search.css';
import { fetchCoins, deleteCoin } from '../../../../features/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notification from '../../../Alerts/notification';
class Search extends Component {

    state = { visible: true, coins: [], show: [], notification: <></> }

    _isMounted = false;

    input = React.createRef();


    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getCoins();

    }

    componentWillReceiveProps = (props) => {
        this.setState({ coins: props.coins, show: props.coins });
    }

    handleChange = () => {
        let input = this.input.current.value;
        if (input.length === 0) { this.setState({ show: this.state.coins }) }
    }

    handleSearch = () => {
        let input = this.input.current.value;
        let { coins } = this.state;
        let result = coins;
        if (input.length >= 1) {
            result = coins.filter(e => e.name.substring(0, input.length).toLowerCase() === input.toLowerCase())
        }
        this.setState({ show: result });
    }

    handleDelete(id) {
        this._isMounted && this.props.deleteCoin(id)
            .then(res => res === true ? this.setState({ notification: <Notification notification='success' text="successfully deleted" /> })
                : this.setState({ notification: <Notification notification='error' text="problem occured while deleting" /> }));
        let coins = JSON.parse(localStorage.getItem('coins')) || [];
        let updated = [];
        updated = coins.filter(e => e.id !== id);
        localStorage.setItem('coins', JSON.stringify(updated));
        let history = JSON.parse(localStorage.getItem('history')) || [];
        let historyUpdate = [];
        historyUpdate = history.filter(e => e.id !== id);
        localStorage.setItem('history', JSON.stringify(historyUpdate));
        this.setState({ notification: null })
    }

    handleScroll = () => {
        this._isMounted && document.body.getBoundingClientRect().top < 0 ? this.setState({ visible: true }) : console.log();
    }

    getCoins() {
        if (this._isMounted) {
            window.addEventListener('scroll', this.handleScroll);
            this.props.fetchCoins();
        }

    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { visible } = this.state;
        let { loading } = this.props;

        if (loading) {

            return <div> <div className="search">
                <div className="search-input">
                    <label>Input field</label>
                    <input />
                </div>
                <button>Search</button>

            </div>
                <div style={{ marginLeft: 65 }} className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>


        }

        return (
            <div>
                <div className="search">
                    <div className="search-input">
                        <label>Input field</label>
                        <input ref={this.input} onChange={this.handleChange} />
                    </div>
                    <button onClick={this.handleSearch} className="animation-buttons">Search</button>

                </div>
                <div className="all-coins">
                    {this.state.show.map((c, i) =>
                        <div className="each-coin" key={i}>
                            <img src={c.frontphoto} alt="coin" />
                            <div className="each-coin-text">
                                <span className="each-coin-text-name">{c.name}</span>
                                <span>{c.text.substring(100, c.text.lastIndexOf('.', 5))}...</span>
                            </div>

                            <Link to={`/admin/panel/edit/${c.id}`}><button className="animation-buttons">Edit</button></Link>
                            <button className="animation-buttons" onClick={() => this.handleDelete(c.id)}>Delete</button>
                        </div>)}
                </div>

                {visible && <div className="add-coin">
                    <div onClick={() => this.props.handleMenu('add')} className="circle">+</div>
                </div>}

                {this.state.notification}
                {/* <img  src={require("../../../../images/cent1.png")} /> */}






            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        coins: state.newReducer.coins,
        loading: state.newReducer.loading
    };
}


export default connect(mapStateToProps, { fetchCoins, deleteCoin })(Search)


