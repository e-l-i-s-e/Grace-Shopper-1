import React, {Component} from 'react'
import { connect } from 'react-redux'
// import {Link} from 'react-router-dom';
import  { sendEmail } from '../store/email'
// import CartItems from './cartItems'


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
            address: '',
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
      console.log('e.target.value', e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        console.log('handleSubmit', this.state.email)
        this.props.sendEmail(this.state.email)

        this.setState({
            orderProduct: [],
            isLoggedIn: false,
            email: '',
            address: ''
        })
    }
    render(){
        console.log(this.state.orderProduct)
        return(
          <div>
          {/* {
            this.state.orderProduct && this.state.orderProduct.map(orderProduct => <CartItems key={product.id} orderProduct={orderProduct} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            )
          } */}
          <h2>Checkout!!!!!!</h2>
          {/* <div>
            <Link to='/checkout'><button type='submit' onSubmit={this.handleSubmit}>Checkout</button></Link>
          </div> */}
            <form onSubmit={this.handleSubmit}>
                <label>
                Email:
                <input type="email" name='email' value={this.state.email} onChange={this.handleChange} />
                </label>
                <label>
                Address:
                <input type="text" name='address' value={this.state.address} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
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
        sendEmail: (email) => dispatch(sendEmail(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
