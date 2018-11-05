import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import product from '../store/product'
import { gotAllOrders } from '../store/order'
import CartItems from './cartItems'

//add a select item button on the main view page and individual for customer to purchase product
//it will either add data to database (validated user) OR to sessionStorage
// it should be an array of objects - that should contain quanitity (that we keep track of!)
// from ORDER PRODUCT (which has all the fields we need)
// we can eager load or join them if needed

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            orderProduct: [],
            isLoggedIn: false,
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.total = this.total.bind(this)
    }

    componentDidMount(){
        if (this.props.user.id){
            this.props.gotAllOrders(Number(this.props.user.id))
            this.setState = {
                orders: this.props.order
            }
        } else {
            const orderProduct = JSON.parse(sessionStorage.getItem('orderProduct'));

            console.log('orderProduct in CART', orderProduct);
            if (orderProduct) {
              this.setState({orderProduct})
            }
            this.setState({isLoggedIn: false})
        }
    }
    handleChange(e){
        // need to add to sessionStorage
        // if (!this.state.isLoggedIn){
        //     sessionStorage.setItem('orderProduct', this.state)
        // }
    }
    handleSubmit(e){
        e.preventDefault()
        // this.props.setNewProduct(this.state)
        this.setState({
            items: []
        })
    }
    total(){
        return this.state.orderProduct.reduce((sumTotal, orderProduct) => {
            const productTotal = orderProduct.quantity * orderProduct.price
            return sumTotal + productTotal
        }, 0)
    }
    render(){
        const price = this.total()
        if(this.props.user.id && this.props.order){
            
            console.log("ORDER", this.props.order)
            // console.log("ORDERPRODS", this.props.order[0])
            return(
                <div>
                {
                    
                  this.props.order.products && this.props.order.products.map( 
                      (aProduct) => <CartItems 
                      key={aProduct.id} 
                      order={this.order} 
                      orderProduct={aProduct} 
                      handleChange={this.handleChange} 
                      handleSubmit={this.handleSubmit} 
                      user={this.user}/>
                  )
                }
                <div>
                  <button type='submit' onSubmit={this.handleSubmit}>Checkout</button>
                </div>
                </div>
              )
        }
        return(
          <div>
              <div>
                  {/* <h2>Total Price: ${this.total()}</h2> */}
                  <h2>Total Price: ${price}</h2>
              </div>
          {
            this.state.orderProduct && this.state.orderProduct.map(orderProduct => <CartItems key={product.id} order={this.order} orderProduct={orderProduct} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.user}/>
            )
          }
          <div>
            <Link to='/checkout'><button type='submit' onSubmit={this.handleSubmit}>Checkout</button></Link>
          </div>
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
        gotAllOrders: (user) => dispatch(gotAllOrders(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
