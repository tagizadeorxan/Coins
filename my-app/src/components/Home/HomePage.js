import React, { Component } from 'react';
import './homepage.css';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCoins } from '../../../src/features/actions';
import Filter from './Filter';
import ShowAll from './Filter/showall';

const upIcon = require('../../images/up.png');
const downIcon = require('../../images/down.png');
const rightIcon = require('../../images/right.png');
const admin = require('../../images/admin.png');
const buy = require('../../images/buy.png');
const gold = require('../../images/gold.png');
const silver = require('../../images/silver.png');
const bronze = require('../../images/bronze.png');
const history = require('../../images/history.png');
const home = require('../../images/home.png');

class HomePage extends Component {

    state = { visible: false, coins: [], bullion: [], exclusive: [], commemorative: [], exclusiveIMG: '', bullionIMG: '', commemorativeIMG: '', allcoins: false, showall: [], searchdata: {},raiting:[] }

    constructor(props) {
        super();
        this.input = React.createRef();
    }

    handleClick = () => {
        this.setState({ visible: !this.state.visible })
    }

    handleInputChange = () => {
        if (this.input.current.value.length < 1) {
            this.handleSearchData();
        }
    }

    handleAdvancedSearchData = (searchdata) => {
        this.setState({ searchdata })
    }

    // advanced filter  options recieving inputs from Filter js
    handleSearchData = () => {

        let result = [];
        let { searchdata } = this.state;
        if (this.state.visible && searchdata !== undefined) {

            this.setState({ searchdata });
            result = this.state.coins.filter(e =>
 e.name.substring(0, this.input.current.value.length).toLowerCase() === this.input.current.value.toLowerCase() &&
                e.issuingcountry.toUpperCase() === searchdata.issuingcountry
                && e.composition.toUpperCase() === searchdata.composition
                && e.quality.toUpperCase() === searchdata.quality
                && e.price > searchdata.pricefrom
                && e.price < searchdata.priceto
                && e.year > searchdata.yearfrom
                && e.year < searchdata.yearto
            );
        } else {
            result = this.state.coins.filter(e =>
                e.name.substring(0, this.input.current.value.length).toLowerCase() === this.input.current.value.toLowerCase())
        }

        this.setState({ showall: result });
    }


    componentDidMount() {
        this.props.fetchCoins();
    }

    handleSelectAll(type) {
        this.setState({ allcoins: !this.state.allcoins, showall: this.state[type] })
    }


    handleAdvancedFilter() {
        this.setState({ allcoins: true });
        this.handleSearchData();
    }

    // filter array to type of coins 
    componentWillReceiveProps(props) {
        let bullion = props.coins.filter(e => e.typeID === 1);
        let exclusive = props.coins.filter(e => e.typeID === 2);
        let commemorative = props.coins.filter(e => e.typeID == 3);
        this.setState({ coins: props.coins, bullion, exclusive, commemorative });
        let bullionIMG = bullion[Math.floor(Math.random() * bullion.length)];
        if (bullionIMG != undefined) {

            this.setState({ bullionIMG: bullionIMG.frontphoto })
        }

        let exclusiveIMG = exclusive[Math.floor(Math.random() * exclusive.length)];
        if (exclusiveIMG != undefined) {
            console.log(exclusiveIMG);
            this.setState({ exclusiveIMG: exclusiveIMG.frontphoto })
        }

        let commemorativeIMG = commemorative[Math.floor(Math.random() * commemorative.length)];
        if (commemorativeIMG != undefined) {
            this.setState({ commemorativeIMG: commemorativeIMG.frontphoto })
        }

        if (props.coins[0] != undefined) {
            let searchdata = {
                issuingcountry: props.coins[0].issuingcountry.toUpperCase(),
                composition: props.coins[0].composition.toUpperCase(),
                quality: props.coins[0].quality.toUpperCase(),
                pricefrom: 0,
                priceto: 200,
                yearfrom: 0,
                yearto: 2020
            }
            console.log(searchdata);
            this.setState({ searchdata });
        }


        if(props.coins.length>1) {
            let raiting = props.coins.sort((a, b) => b.active - a.active);
            console.log(raiting)
            this.setState({raiting})
        }
        
    }

    handleHome = () => {
        window.location.href = '/';
      }

    render() {
        return (
            <div className="main-container">
             <div className="raiting-top-three-coins">
                <div><img src={gold}/><img src={this.state.raiting.length>1? this.state.raiting[0].frontphoto : null}/></div>
                <div><img src={silver}/><img src={this.state.raiting.length>1? this.state.raiting[1].frontphoto : null}/></div>
                <div><img src={bronze}/><img src={this.state.raiting.length>1? this.state.raiting[2].frontphoto : null}/></div>
             </div>
             <NavLink className="admin-panel" to='/buy'><img src={buy}/><div>{(JSON.parse(localStorage.getItem('coins')) || []).length}</div></NavLink>
                <NavLink className="admin-panel" to='/admin'><img src={admin}/></NavLink>
                {this.state.allcoins || <div className="admin-panel-header">
                    <div className="header"><span>Homepage</span></div>

                </div>}

                {this.state.allcoins && <div className="admin-panel-header">
                    <div className="header"><span>List of the coins</span><img onClick={this.handleHome} src={home}/></div>

                </div>}

                <div className="search">
                    <div className="search-input">
                        <label>Input field</label>
                        <input ref={this.input} defaultValue="" onChange={this.handleInputChange} />
                    </div>
                    <button onClick={() => this.handleAdvancedFilter()} className="homepage-search-button">Search</button>

                </div>
                {this.state.visible && <div className="advanced-filter-up"><span>Advanced filter</span><button onClick={this.handleClick} ><img src={upIcon} /></button></div>}
                {this.state.visible || <div className="advanced-filter-down"><span>Advanced filter</span><button onClick={this.handleClick}><img src={downIcon} /></button></div>}

                {this.state.visible && <Filter searchdata={this.handleAdvancedSearchData} coins={this.state.coins} />}

                {this.state.allcoins || <div> {this.state.visible || <div className="homepage-type-coins">

                    <div className="homepage-type-each">
                        <h1>Bullion coins</h1>
                        <div className="advanced-filter-right"><span>Show all</span><button onClick={() => this.handleSelectAll('bullion')}><img src={rightIcon} /></button></div>
                        <img onClick={() => this.handleSelectAll('bullion')} className="random-coin" src={this.state.bullionIMG} />
                    </div>

                    <div className="homepage-type-each">
                        <h1>Exclusive coins</h1>
                        <div className="advanced-filter-right"><span>Show all</span><button onClick={() => this.handleSelectAll('exclusive')}><img src={rightIcon} /></button></div>
                        <img onClick={() => this.handleSelectAll('exclusive')} className="random-coin" src={this.state.exclusiveIMG} />
                    </div>

                    <div className="homepage-type-each">
                        <h1>Commemorative coins</h1>
                        <div className="advanced-filter-right"><span>Show all</span><button onClick={() => this.handleSelectAll('commemorative')}><img src={rightIcon} /></button></div>
                        <img onClick={() => this.handleSelectAll('commemorative')} className="random-coin" src={this.state.commemorativeIMG} />
                    </div>


                </div>}</div>}
                {
                    this.state.allcoins && <ShowAll data={this.state.showall} />
                }
                 <div className="coins-history-text">Last viewed coins:</div>
                <div className="coins-history"><img src={history}/>{(JSON.parse(localStorage.getItem('history')) || []).map((e,i)=><Link  key={i} to={`/eachcoin/${e.id}`}><div ><span className="coins-history-names">{e.name}</span><img  src={e.frontphoto}/></div></Link>)}</div>
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


export default connect(mapStateToProps, { fetchCoins })(HomePage)