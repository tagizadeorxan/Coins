import React from 'react';

import './creditcard.scss';


export default class CreditCard extends React.Component {

    componentDidMount () {
        console.log(this.props);
    }
 
  render() {
    return (
 
        <form className="form-data-inputs">
        	<input
            type="tel"
            name="number"
            maxLength='16'
            placeholder="Card Number"
            onChange={this.props.handleInputChange}
            onFocus={this.props.handleInputFocus}
          />
            	<input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.props.handleInputChange}
            onFocus={this.props.handleInputFocus}
          />

<input
            type="number"
            name="expiry"
            placeholder="expiry date"
            maxLength='2'
            onChange={this.props.handleInputChange}
            onFocus={this.props.handleInputFocus}
          />

          
<input
            type="number"
            name="cvc"
            placeholder="cvc"
            maxLength="3"
            onChange={this.props.handleInputChange}
            onFocus={this.props.handleInputFocus}
          />
        </form>
      
    );
  }
}