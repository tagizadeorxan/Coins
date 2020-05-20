import React, { Component } from 'react';
import './filter.css';

class Filter extends Component {

    state = { countries: [], compositions: [], qualities: [] };

    constructor(props) {
        super(props);
        this.props = props;
        this.issuingcountry = React.createRef();
        this.composition = React.createRef();
        this.quality = React.createRef();
        this.pricefrom = React.createRef();
        this.priceto = React.createRef();
        this.yearfrom = React.createRef();
        this.yearto = React.createRef();
 

    }


    handleSearch = () => {
        let searchdata = {
            issuingcountry: this.issuingcountry.current.value,
            composition:this.composition.current.value,
            quality:this.quality.current.value,
            pricefrom:this.pricefrom.current.value,
            priceto: this.priceto.current.value,
            yearfrom: this.yearfrom.current.value,
            yearto: this.yearto.current.value
        }
        this.props.searchdata(searchdata);
    }

    componentDidMount() {
        console.log(this.props);
        let countries = [], compositions = [], qualities = [];
        this.props.coins.map(e => (countries.push(e.issuingcountry.toUpperCase()), compositions.push(e.composition.toUpperCase()), qualities.push(e.quality.toUpperCase())));
        countries = [...new Set(countries)];
        compositions = [...new Set(compositions)];
        qualities = [...new Set(qualities)];
        this.setState({ countries, compositions, qualities });
    }
    render() {
        let { countries, compositions, qualities } = this.state;
        return (
            <div className="filter-page-main">
                <div className="filter-page-part-one">
                    <div>
                        <label>Issuing country</label>
                        <select  onChange={this.handleSearch} ref={this.issuingcountry} className="minimal">
                            <option defaultValue="CANADA" hidden>CANADA</option>
                            {countries.map((e, i) => <option  key={i}>{e}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>Metal</label>
                        <select  defaultValue="" onChange={this.handleSearch} ref={this.composition} className="minimal">
                            <option defaultValue="NICKEL" hidden>NICKEL</option>
                            {compositions.map((e, i) => <option  key={i}>{e}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>Quality of the coin</label>
                        <select  defaultValue="BU" onChange={this.handleSearch} ref={this.quality} className="minimal">
                  
                            {qualities.map((e, i) => <option  key={i}>{e}</option>)}
                        </select>
                    </div>
                </div>

                <div className="filter-page-part-two">

                    <label>Price</label>
                    <div>
                        <p>from</p>
                        <input onChange={this.handleSearch} defaultValue={0} ref={this.pricefrom} type="number" />
                        <p>to</p>
                        <input onChange={this.handleSearch} defaultValue={200} ref={this.priceto} type="number" />
                    </div>

                    <label>Year of issue</label>
                    <div>
                        <p>from</p>
                        <input onChange={this.handleSearch} defaultValue={0} ref={this.yearfrom} type="number" />
                        <p>to</p>
                        <input onChange={this.handleSearch} defaultValue={2020} ref={this.yearto} type="number" />
                    </div>

                </div>

            </div>
        )
    }
}

export default Filter;