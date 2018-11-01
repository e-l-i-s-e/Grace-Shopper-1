import React, {Component} from 'react'
import { connect } from 'react-redux'
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
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        // this.props.setNewProduct(this.state)
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
                <input type="email" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                Address:
                <input type="email" value={this.state.value} onChange={this.handleChange} />
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

// const mapDispatchToProps = (dispatch) => {
    // return {
    //     setNewProduct: (newProduct) => dispatch(setNewProduct(newProduct))
    // }
// }

export default connect(mapStateToProps, null)(Checkout)
