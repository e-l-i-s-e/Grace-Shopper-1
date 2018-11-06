import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import product from '../store/product'
import { gotAllOrders, deleteFromCart, changeQuantity, getNewPrice } from '../store/order'
import { me } from '../store/user'
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

  async componentDidMount(){
    await this.props.me()

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
    const PlusOrMinus = evt.target.name;
    const [orderProductInLocalState] = this.state.orderProduct.filter(product => product.id === productId);

    PlusOrMinus === 'increment'
        ? orderProductInLocalState.quantity++
        : orderProductInLocalState.quantity--;

    let updatedQuantity = orderProductInLocalState.quantity

    const newState = this.state.orderProduct.map(product => {
      if (product.id === productId) {
        return orderProductInLocalState
      } else {
        return product
      }
    })

    if(this.props.user.id){
      this.props.changeQuantity({
        quantity: Number(updatedQuantity),
        productId: Number(orderProductInLocalState.id),
        orderId: Number(this.props.order.id),
        userId: Number(this.props.user.id)
      })
    } else {
      sessionStorage.setItem('orderProduct', JSON.stringify(newState))
    }

    this.setState({
      orderProduct: newState
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const productId = Number(evt.target.name);
    const userId = Number(this.props.user.id)

    if (this.props.user.id) {

      const infoForDelete = {productId, userId}
      this.props.deleteFromCart(infoForDelete)
      this.props.getNewPrice(Number(this.props.user.id))
      this.props.history.push('/cart/')
      //Anna will remove items from the logged in user's cart in the database

    } else {
      const orderProductSession = JSON.parse(sessionStorage.getItem('orderProduct'));
      let newOrderProductSession = orderProductSession.filter(prod => prod.id !== productId)
      sessionStorage.setItem('orderProduct', JSON.stringify(newOrderProductSession))
      this.setState({ orderProduct: newOrderProductSession })
    }
  }

  total() {
    const orderProducts = this.props.user.id ? this.props.order.products : this.state.orderProduct
    console.log('ORDERPROD in TOT', orderProducts)
    let total;
    if (orderProducts){
      total = orderProducts.reduce((sumTotal, orderProduct) => {
       console.log('orderProduct', orderProduct.orderProduct.quantity);
       console.log('orderProduct.price',  orderProduct.price);
       const productTotal = orderProduct.orderProduct.quantity * orderProduct.price
       console.log('productTotal', productTotal)
       return sumTotal + productTotal
     }, 0)
    }
    total = ((total)/100).toFixed(2)
    return total ? total : 0
  }

    render(){
      console.log("OrderProdutc",this.state.orderProduct)
        if(this.props.user.id && this.props.order){
         console.log("ORDER", this.props.order)
         console.log("ORDER on local state", this.state.order)
        return(
                <div>
                  <div>
                    <h2>Total Price: ${this.total()}</h2>
                  </div>
                {

                  this.props.order.products && this.props.order.products.map(
                      (aProduct) => <CartItems
                      key={aProduct.id}
                      order={this.order}
                      orderProduct={aProduct}
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      user={this.user}/>

                  )}
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
    changeQuantity: (quantity) => dispatch(changeQuantity(quantity)),
    getNewPrice: (orderid) => dispatch(getNewPrice(orderid)),
    me: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
