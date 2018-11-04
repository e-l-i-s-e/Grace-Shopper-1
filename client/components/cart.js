import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import product from '../store/product'
import { gotAllOrders, deleteFromCart, changeQuantity } from '../store/order'
import CartItems from './cartItems'

class Cart extends Component {
  constructor(){
      super()
      this.state = {
          orderProduct: [],
          isLoggedIn: false,
          orders: {}
      }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.total = this.total.bind(this)
  }

  componentDidMount(){
    if (this.props.user.id){
        this.props.gotAllOrders(Number(this.props.user.id))
        
    } else {
        const orderProduct = JSON.parse(sessionStorage.getItem('orderProduct'));
        if (orderProduct) {
          this.setState({orderProduct})
        }
        this.setState({isLoggedIn: false})
    }
  }

  handleChange(evt) {
    const productId = Number(evt.target.value);
    console.log('productId',evt.target.value)
    const PlusOrMinus = evt.target.name;
  

    if(this.props.user.id){
      console.log("IAMAUSER")
      const [productChanging] = this.props.order.products.filter(aProduct => aProduct.id === productId)
      const quantityOfProduct = productChanging.orderProduct.quantity
      let updatedQuanity;
      PlusOrMinus === 'increment'
        ? updatedQuanity = quantityOfProduct + 1
        : updatedQuanity = quantityOfProduct - 1
  
      this.props.changeQuantity({
        quantity: Number(updatedQuanity),
        productId: Number(productChanging.id),
        orderId: Number(this.props.order.id),
        userId: Number(this.props.user.id)
      })
      console.log("CHANGEQUANT")

    } else {
      const [orderProductInLocalState] = this.state.orderProduct.filter(product => product.id === productId);
      console.log('state', this.state.orderProduct )
      console.log('orderProductInLocalState', orderProductInLocalState)
      PlusOrMinus === 'increment'
        ? orderProductInLocalState.quantity++
        : orderProductInLocalState.quantity--;

      const newState = this.state.orderProduct.map(product => {
        if (product.id === productId) {
          return orderProductInLocalState
        } else {
          return product
        }
      })
      sessionStorage.setItem('orderProduct', JSON.stringify(newState))
      this.setState({
        orderProduct: newState
      })
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const productId = Number(evt.target.name);
    if (this.props.user.id) {
       this.props.deleteFromCart({
         userId: this.props.user.id,
         productId
       })
       this.props.gotAllOrders(Number(this.props.user.id)) //not sure if this is necessary to update cart view

      //Anna will remove items from the logged in user's cart in the database

    } else {
      const orderProductSession = JSON.parse(sessionStorage.getItem('orderProduct'));
      let newOrderProductSession = orderProductSession.filter(prod => prod.id !== productId)
      sessionStorage.setItem('orderProduct', JSON.stringify(newOrderProductSession))
      this.setState({ orderProduct: newOrderProductSession })
    }
  }

  total() {
    return this.state.orderProduct.reduce((sumTotal, orderProduct) => {
      const productTotal = orderProduct.quantity * orderProduct.price
      return sumTotal + productTotal
    }, 0)
  }

    render(){
      console.log("OrderProdutc",this.state.orderProduct)
        if(this.props.user.id && this.props.order){
         console.log("ORDER", this.props.order)
         console.log("ORDER on local state", this.state.order)
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
      return (
        <div>
          <div>
            <h2>Total Price: ${this.total()}</h2>
          </div>
          {
            this.state.orderProduct && this.state.orderProduct.map(orderProduct => <CartItems key={product.id} orderProduct={orderProduct} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.user} />
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
    gotAllOrders: (user) => dispatch(gotAllOrders(user)),
    deleteFromCart: (aProduct) => dispatch(deleteFromCart(aProduct)),
    changeQuantity: (quantity) => dispatch(changeQuantity(quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
