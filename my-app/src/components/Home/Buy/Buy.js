import React, { Component } from 'react';
import './buy.css';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

class Buy extends Component {

    state = { coins: [], USD:0 }

    componentDidMount() {
        let coins = JSON.parse(localStorage.getItem('coins')) || [];
        this.setState({ coins });
        this.getCurrency();
    }

    getCurrency = () => {
         fetch("https://api.exchangeratesapi.io/latest?symbols=RUB,USD").then(data=> data.json()).then(usd=> this.setState({USD:usd.rates.RUB}))
    }

    handleBuy = () => {
        
        var doc = new jsPDF()

        doc.autoTable({ html: '#my-table' })
        let newArray =[];
        this.state.coins.filter(e=> newArray.push([e.name,1,`${e.price} USD`]))
        let total = Number(this.state.USD) * Number(this.state.coins.reduce((p, n) => p + Number(n.price), 0));
        // Or use javascript directly:
        doc.autoTable({
          head: [['CoinName', 'Quantity', 'Price']],
          body: newArray,
          foot:[['Total','',`${total} RUB`]]
        })


        localStorage.setItem('coins', JSON.stringify([]));
        doc.save('invoice.pdf');
        let win = window.open('https://money.yandex.ru/to/4100112631273796', '_blank');
        win.focus();
       
        
        window.location.href = '/';
     
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
                            <img src={c.frontphoto} />
                            <i>{c.name}</i>
                            <b>{c.price}$</b>
                            <strong>x 1</strong>
                            <button onClick={() => this.deleteItem(c.id)} className="remove-button">x</button>
                        </div>)}
                    </div>




                </div>
                <button onClick={this.handleBuy} className="buy-button" >Buy</button>
                <button onClick={() => window.location.href = '/'} className="buy-button" >Shop</button>
</div>
               


            </div>
        )
    }
}

export default Buy;