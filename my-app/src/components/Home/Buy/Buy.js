import React, { Component } from 'react';
import './buy.css';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import Notification from './../../Alerts/notification';

class Buy extends Component {

    state = { coins: [], USD: 0, notification: <></> }

    componentDidMount() {
        let coins = JSON.parse(localStorage.getItem('coins')) || [];
        this.setState({ coins });
        this.getCurrency();
        window.addEventListener("focus", this.onFocus)
    }

    quantityChange = (type, id) => {
        let coins = JSON.parse(localStorage.getItem('coins')) || [];
        if (type === 'minus') {
            coins.map(c => c.id === id ? c.quantity-- : null);
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

        let newArray = [];
        let coins = JSON.parse(localStorage.getItem('coins')) || [];
        if (coins.length > 0) {
            var doc = new jsPDF()
            doc.autoTable({ html: '#my-table' })
            coins.filter(e => newArray.push([e.name, e.quantity, `${e.price} USD`]))
            let total = Number(this.state.USD) * Number(this.state.coins.reduce((p, n) => p + Number(n.price), 0));
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
            window.location.href = '/';
        } else {
            this.setState({ notification: <Notification notification="error" text="don't have any product in your basket" /> })
            setTimeout(() => this.setState({ notification: null }), 2000)
        }


    }


    deleteItem = (id) => {
        let coins = this.state.coins.filter(e => e.id !== id);
        localStorage.setItem('coins', JSON.stringify(coins));
        this.setState({ coins });
    }



    render() {
        let { coins } = this.state;
        return (
            <div className="shopping-container">

                <div>
                    <p className="shopping-total-sum">Total: {coins.reduce((p, n) => p + Number(n.price), 0)}$ / {Math.round(Number(this.state.USD) * Number(coins.reduce((p, n) => p + Number(n.price), 0)))}₽</p>

                    <div className="shopping-cart">
                        <div>
                            {coins.map((c, i) => <div className="each-purchase" key={i}>
                                <img alt="coin-front" src={c.frontphoto} />
                                <i>{c.name}</i>
                                <b>{c.price}$</b>
                                <button onClick={() => this.quantityChange('minus', c.id)}>-</button>
                                <strong>{c.quantity} qty</strong>
                                <button onClick={() => this.quantityChange('plus', c.id)}>+</button>
                                <button onClick={() => this.deleteItem(c.id)} className="remove-button">remove</button>
                            </div>)}
                        </div>

                    </div>
                    <button onClick={this.handleBuy} className="buy-button" >Buy</button>
                    <button onClick={() => window.location.href = '/'} className="buy-button" >Shop</button>
                </div>
                {this.state.notification}
            </div>
        )
    }
}

export default Buy;