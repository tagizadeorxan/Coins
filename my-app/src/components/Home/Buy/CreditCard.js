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
            maxLength="16"
            placeholder="Card Number"
            onChange={this.props.handleInputChange}
            onFocus={this.props.handleInputFocus}
          />
          <i>E.g.: 49..., 51..., 36..., 37...</i>
            	<input
            type="text"
            name="name"
            placeholder="Name"
            maxLength='18'
            onChange={this.props.handleInputChange}
            onFocus={this.props.handleInputFocus}
          />

<input
            type="tel"
            name="expiry"
            placeholder="Expiry date"
            maxLength='4'
            onChange={this.props.handleInputChange}
            onFocus={this.props.handleInputFocus}
          />

          
<input
            type="tel"
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