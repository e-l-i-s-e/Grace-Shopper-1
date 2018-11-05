import React, {Component} from 'react'
import { connect } from 'react-redux'
import CheckoutForm from './checkoutForm'
import TakeMoney from './takeMoney'

import {Link} from 'react-router-dom';
import product, { setNewProduct } from '../store/product'
import CartItems from './cartItems'


//add a select item button on the main view page and individual for customer to purchase product
//it will either add data to database (validated user) OR to sessionStorage
// it should be an array of objects - that should contain quanitity (that we keep track of!)
// from ORDER PRODUCT (which has all the fields we need)
// we can eager load or join them if needed

class Checkout extends Component {
    constructor(){
        super()
        this.state = {
            orderProduct: [],
            isLoggedIn: false,
            email: '',
            firstName: '',
            lastName: '',
            streetAddress1: '',
            streetAddress2: '',
            city: '',
            country: '',
            state: '',
            zipCode: '',
            phone: '',
            total: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        if (this.props.user.id){
            //populate local state with the session
            /* OR this.setState({isLoggedIn: true}) -- put in IF */
        } else {
            const orderProduct = JSON.parse(sessionStorage.getItem('orderProduct'));
            if (orderProduct) {
              this.setState({orderProduct})
            }
            this.setState({isLoggedIn: false})
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        // this.props.setNewProduct(this.state)
        // const nodemailer = require('nodemailer');

        // var transporter = nodemailer.createTransport({
        //   service: 'gmail',
        //   auth: {
        //     user: 'ScentedShopper@gmail.com',
        //     pass: 'Scented1809'
        //   }
        // });

        // var mailOptions = {
        //   from: 'ScentedShopper@gmail.com',
        //   to: `${this.state.email}`,
        //   subject: 'Your Scented.com order',
        //   text: 'Thanks for your purchase with Scented!'
        // };

        // transporter.sendMail(mailOptions, function(error, info){
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        this.setState({
            orderProduct: [],
            isLoggedIn: false,
            email: '',
            firstName: '',
            lastName: '',
            streetAddress1: '',
            streetAddress2: '',
            city: '',
            country: '',
            state: '',
            zipCode: '',
            phone: '',
            total: ''
        })
    }

    render(){
        console.log("order", this.state.orderProduct)
        const price = this.props.price
        console.log("price", price)
        console.log(this.state.total)

        return(
          <div>
          {/* {
            this.state.orderProduct && this.state.orderProduct.map(orderProduct => <CartItems key={product.id} orderProduct={orderProduct} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            )
          } */}
          {/* <div>
            <Link to='/checkout'><button type='submit' onSubmit={this.handleSubmit}>Checkout</button></Link>
          </div> */}

            <CheckoutForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/> 
            <TakeMoney />
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Checkout)





