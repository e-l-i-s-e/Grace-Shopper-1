import React, {Component} from 'react'
import { connect } from 'react-redux'
import  { sendEmail } from '../store/email'
import CheckoutForm from './checkoutForm'
import {gotAllOrders} from '../store/order'

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
            total: '',
            promoCode: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
      console.log('HERE ')
        if (this.props.user.id){
            //populate local state with the session
            /* OR this.setState({isLoggedIn: true}) -- put in IF */
            this.props.gotAllOrders(this.props.user.id)
        } else {

            const orderProduct = JSON.parse(sessionStorage.getItem('orderProduct'));
            console.log('orderProd', orderProduct)
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
        //     total: '',
        //     promoCode: ''
        // })
    }

    render(){
        const total = this.props.location.state
        // const total = this.props.total
        console.log('props', this.props)
        console.log('state', this.state)
        return(
          <div className="title">
            <CheckoutForm {...this.state} total={total} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
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
