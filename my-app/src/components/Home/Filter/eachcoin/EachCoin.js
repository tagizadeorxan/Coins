import React, { Component } from 'react';
import { connect } from 'react-redux';
import './eachcoin.css';
const viewIcon = require('../../../../images/view.png');



class EachCoin extends Component {


    state = { id:0 ,coin:{},loading:false,text:[],stringOne:'',stringTwo:'',stringThree:''}

    constructor(props) {
        super(props)
        this.state.id=this.props.match.params.id;
    }

    componentDidMount () {
        this.getCoin();
        this.addActive();
   
       
    }

    handleBasket = () => {
        let arr = JSON.parse(localStorage.getItem('coins')) || [];
         arr.push(this.state.coin);
        localStorage.setItem('coins',JSON.stringify(arr));

    }

    addActive = () => {
        let options = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' }
        }
        fetch(`http://localhost:3000/coins/active/${this.state.id}`,options);
    }

    getCoin = () => {
        fetch(`http://localhost:3000/coins/${this.state.id}`).then(res=> {
               if(res.status === 200) {
                   return res.json();
               } else {
                   console.log("burami")
                   throw new Error ("problem")
               }}).then(coin => this.setState({coin:coin[0]},()=>this.getData()))
        }

getData = () => {
    this.setState({loading:true})
    let text = this.state.coin.text.match(/[^\.!\?]+[\.!\?]+/g); 
    console.log(text);
    this.setState({text})
    let slice1 = Math.floor(text.length-text.length*80/100),
        slice2 = Math.floor(text.length-text.length*40/100),
        slice3 = Math.floor(text.length);
    let stringOne = text.slice(0,slice1).join(""),
        stringTwo = text.slice(slice1,slice2).join(""),
        stringThree =  text.slice(slice2,slice3).join("");
    
  this.setState({stringOne,stringTwo,stringThree});

  let arr = JSON.parse(localStorage.getItem('history')) || [];
   arr.unshift(this.state.coin);
   let unique = arr.filter((elem, index, self) => self.findIndex(
    (t) => {return (t.id === elem.id )}) === index)
   if(unique.length>10) {
    unique.pop();
   }
  localStorage.setItem('history',JSON.stringify(unique));
}



    render() {

        let { coin,loading,stringOne,stringTwo,stringThree } = this.state;
        if(!loading) {
            return <p>Loading...</p>
        }
        return (
            <div className="each-coin-container">
            <div className="view-icon-container"> <img className="view-icon" alt="viewcoin" src={viewIcon}/><span> {coin.active}</span></div>
                     
                <div className="each-coin-images">
                    <img alt="coin-front" src={coin.frontphoto} />
                    <img alt="coin-back" src={coin.backphoto} />
                   
                </div>

                <div className="each-coin-information-block">
                <div className="each-coin-text-box">
                    <h1>{coin.name}</h1>
                    <p>{stringOne}</p>
                    <p>{stringTwo}</p>
                    <p>{stringThree}</p></div>
                    <table>
                    <tbody>
                        <tr>
                            <td>Issuing Country</td>
                            <td>{coin.issuingcountry}</td>
                        </tr>
                        <tr>
                            <td>Composition</td>
                            <td>{coin.composition}</td>
                        </tr>
                        <tr>
                            <td>Quality</td>
                            <td>{coin.quality}</td>
                        </tr>
                        <tr>
                            <td>Denomination</td>
                            <td>{coin.denomination}</td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td>{coin.year}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{coin.weight} g</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{coin.price}$</td>
                        </tr>
                      </tbody>
                    </table>

                     <div>
                     <button onClick={()=> this.props.history.goBack()}>Back to the list</button>
                     <button onClick={this.handleBasket} className="basket">Add to basket</button>
                     </div>
                  

                </div>


            </div>
        )



    }
}

let mapStateToProps = (state) => {
    return {
        coins: state.newReducer.coins
    };
}


export default connect(mapStateToProps)(EachCoin)