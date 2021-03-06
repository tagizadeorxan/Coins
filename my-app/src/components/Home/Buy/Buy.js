import React, { Component } from 'react';
import './buy.css';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import Notification from './../../Alerts/notification';
import CreditCard from './CreditCard';
import Cards from 'react-credit-cards';

class Buy extends Component {

    state = { coins: [], USD: 0, notification: <></>,   cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '', }

    componentDidMount() {
        let coins = JSON.parse(localStorage.getItem('coins')) || [];
        this.setState({ coins });
        this.getCurrency();
        window.addEventListener("focus", this.onFocus)
    }

    quantityChange = (type, id) => {
        let coins = JSON.parse(localStorage.getItem('coins')) || [];
        if (type === 'minus') {
            coins.map(c => c.id === id ? c.quantity > 1 ? c.quantity-- : null : null);
        } else {
            coins.map(c => c.id === id ? c.quantity++ : null);
        }
        localStorage.setItem('coins', JSON.stringify(coins));
         this.setState({ coins });
    }


    onFocus = () => {
        window.location.reload(false)
    }
    // USD to RUB currency api
    getCurrency = () => {
        fetch("https://api.exchangeratesapi.io/latest?symbols=RUB,USD").then(data => data.json()).then(usd => this.setState({ USD: usd.rates.RUB }))
    }

    //payment and creating invoice
    handleBuy = () => {
        let {cvc,expiry,name,number} = this.state;
        
        let newArray = [];
        let coins = JSON.parse(localStorage.getItem('coins')) || [];
        if (coins.length > 0) {

            if(cvc == '' || expiry == '' || name == '' || number == '' ) {
                this.setState({ notification: <Notification notification="error" text="please enter credit card details" /> })
                setTimeout(() => this.setState({ notification: null }), 2000)
            } else {
 console.log()
            var doc = new jsPDF()
            doc.autoTable({ html: '#my-table' })
            coins.filter(e => newArray.push([e.name, e.quantity, `${e.price} USD`]))
            let total = Math.round(Number(this.state.USD) * Number(coins.reduce((p, n) => p + Number(n.price) * n.quantity, 0)));
            // Or use javascript directly:
            doc.autoTable({
                head: [['CoinName', 'Quantity', 'Price']],
                body: newArray,
                foot: [['Total', '', `${total} RUB`]]
            })

            localStorage.setItem('coins', JSON.stringify([]));
            doc.save('invoice.pdf');
            let win = window.open('https://money.yandex.ru/to/4100112631273796', '_blank');
            win.focus();
       } } else {
            this.setState({ notification: <Notification notification="error" text="don't have any product in your basket" /> })
            setTimeout(() => this.setState({ notification: null }), 2000)
        }

    
    }


    deleteItem = (id) => {
        let coins = this.state.coins.filter(e => e.id !== id);
        localStorage.setItem('coins', JSON.stringify(coins));
        this.setState({ coins });
    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
      }
      
      handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }) 
      }
      



    render() {
        let { coins } = this.state;
        return (
            <div className="shopping-container">

                <div>
                    <p className="shopping-total-sum">Total: {coins.reduce((p, n) => p + Number(n.price) * n.quantity, 0)}$ / {Math.round(Number(this.state.USD) * Number(coins.reduce((p, n) => p + Number(n.price) * n.quantity, 0)))}₽</p>

                    <div className="shopping-cart">
                        <div>
                            {coins.map((c, i) => <div className="each-purchase" key={i}>


                                <img onClick={this.handle3D} alt="coin-front" src={c.frontphoto} />
                                <img onClick={this.handle3D} alt="coin-front" src={c.backphoto} />
                                <i>{c.name}</i>
                                <b>{c.price}$</b>
                                <button onClick={() => this.quantityChange('minus', c.id)}>-</button>
                                <strong>{c.quantity} qty</strong>
                                <button onClick={() => this.quantityChange('plus', c.id)}>+</button>
                                <button onClick={() => this.deleteItem(c.id)} className="remove-button">x</button>
                            </div>)}
                        </div>

                    </div>
                    <button onClick={this.handleBuy} className="buy-button" >Buy</button>
                    <button onClick={() => window.location.href = '/'} className="buy-button" >Shop</button>
                </div>
                {this.state.notification}

                <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />

                <CreditCard handleInputFocus={this.handleInputFocus} handleInputChange={this.handleInputChange} state={this.state}/>
                </div>
            </div>
        )
    }
}

export default Buy;