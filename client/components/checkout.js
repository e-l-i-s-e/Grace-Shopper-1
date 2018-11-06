import React, {Component} from 'react'
import { connect } from 'react-redux'
// import {Link} from 'react-router-dom';
import  { sendEmail } from '../store/email'
// import CartItems from './cartItems'
import CheckoutForm from './checkoutForm'
import TakeMoney from './takeMoney'
import {gotAllOrders} from '../store/order'

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
            this.props.gotAllOrders(this.props.user.id)
        } else {
            const orderProduct = JSON.parse(sessionStorage.getItem('orderProduct'));
            if (orderProduct) {
              this.setState({orderProduct})
            }
            this.setState({isLoggedIn: false})
        }
    }
    handleChange(e){
      console.log('e.target.value', e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        console.log('handleSubmit', this.state.email)
        this.props.sendEmail(this.state.email)

        // this.setState({
        //     orderProduct: [],
        //     isLoggedIn: false,
        //     email: '',
        //     firstName: '',
        //     lastName: '',
        //     streetAddress1: '',
        //     streetAddress2: '',
        //     city: '',
        //     country: '',
        //     state: '',
        //     zipCode: '',
        //     phone: '',
        //     total: ''
        // })
    }

    render(){
        console.log('TOTAL', this.props.order)
        return(
          <div>
          {/* {
            this.state.orderProduct && this.state.orderProduct.map(orderProduct => <CartItems key={product.id} orderProduct={orderProduct} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            )
          } */}
          {/* <div>
            <Link to='/checkout'><button type='submit' onSubmit={this.handleSubmit}>Checkout</button></Link>
          </div> */}

            <CheckoutForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> 
            {/* <TakeMoney name={'naaaame of user'} description={'checking outt'} amount={2}/> */}
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

const mapDispatchToProps = (dispatch) => {
    return {
        sendEmail: (email) => dispatch(sendEmail(email)),
        gotAllOrders: (userId) => dispatch(gotAllOrders(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
