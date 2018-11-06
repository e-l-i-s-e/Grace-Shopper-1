import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

export default class TakeMoney extends React.Component {
  constructor(props){
    super(props);
    this.onToken = this.onToken.bind(this)
  }
  onToken(token){
    console.log('onToken', token)
    fetch('/api/stripe', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
    // fetch('/api/stripe', 
    // {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     stripeToken: token.id, 
    // }).then(res => res.json())
    //   .then(json => {
    //     console.log('json', json)
    //   })
    // })
  }
  render() { 
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_D80U47WaOQUTquFL44fpdXof"
        />
      </div>
    )
  }
}
