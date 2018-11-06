import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { gotAllProducts } from '../store/product'
import SingleProduct from './singleProduct'
import { gotAllOrders, postToCart } from '../store/order'
import { me } from '../store/user'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      orderProduct: []
    })
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount(){
    await this.props.gotAllProducts();
    await this.props.me()

    if (this.props.user.id){
      await this.props.gotAllOrders(Number(this.props.user.id))
    }
    const orderProduct = this.props.products.map(product => {
      product.quantity = 1;
      return product
    })
    this.setState({orderProduct})
  }

  handleChange(evt){
    //changing quantity of items before adding to cart
    const productId = Number(evt.target.value);
    const PlusOrMinus = evt.target.name;
    const [ orderProductInLocalState ] = this.state.orderProduct.filter(product => product.id === productId);

    PlusOrMinus === 'increment'
      ? orderProductInLocalState.quantity++
      : orderProductInLocalState.quantity--;

    const newState = this.state.orderProduct.map(product => {
      if (product.id === productId){
        return orderProductInLocalState
      } else {
        return product
      }
    })
    this.setState({
      orderProduct: newState
    })
  }

  handleSubmit(evt){
    //add to cart with given quantity
    evt.preventDefault();

    const productId = Number(evt.target.name);
    const [ selectedProductInLocalState ] = this.state.orderProduct.filter(product => product.id === productId);
    const quantity = selectedProductInLocalState.quantity

    if(this.props.user.id){
      console.log('in if',  selectedProductInLocalState);

      let product = {
        selectedProductInLocalState,
        orderId: this.props.order.id,
        productId,
        quantity
      }

      this.props.postToCart(product)
      // this.props.history.push('/cart/')

    } else {
      const orderProductSession = JSON.parse(sessionStorage.getItem('orderProduct'));
      console.log('orderProductSession', orderProductSession);
      let newOrderProductSession;

        if (!orderProductSession) {
          //if guest cart is empty then add the ONE item that they cliked on to their cart (which is in LOCAL state!)
          console.log('selectedProductInLocalState', selectedProductInLocalState);
          sessionStorage.setItem('orderProduct', JSON.stringify([selectedProductInLocalState]))

        } else {
          const [ selectedProductInSessionStorage ] = orderProductSession.filter(product => product.id === productId)

          if (selectedProductInSessionStorage) {
            //for one specific selectedItem - you want to purchase more of that ONE item (ex: lavendar, added it to cart, want to go back and add more)
            selectedProductInSessionStorage.quantity += selectedProductInLocalState.quantity;

            newOrderProductSession = orderProductSession.map(orderProduct => {
              if (orderProduct.id === productId) {
                return selectedProductInSessionStorage
              } else {
                return orderProduct
              }
            })
          } else{
            newOrderProductSession = [...orderProductSession, selectedProductInLocalState]
          }
          sessionStorage.setItem('orderProduct', JSON.stringify(newOrderProductSession))
    }
  }
}

  render() {
    return (
          <div>
            <main>
              <h3>View All Scents</h3>
              <div id='products' className='row wrap'>
                    {
                        this.state.orderProduct &&
                        this.state.orderProduct.map(orderProduct => {
                            return (
                                <SingleProduct
                                  key={orderProduct.id}
                                  isAdmin={this.props.isAdmin}
                                  handleSubmit={this.handleSubmit}
                                  handleChange={this.handleChange}
                                  orderProduct={orderProduct}
                                />
                            )
                        })
                    }
                    </div>
            </main>
          </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product,
    order: state.order,
    user: state.user,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gotAllProducts: () => dispatch(gotAllProducts()),
    gotAllOrders: (user) => dispatch(gotAllOrders(user)),
    postToCart: (product) => dispatch(postToCart(product)),
    me: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
