import React, { Component } from 'react'
import { connect } from 'react-redux';
//import {Link} from 'react-router-dom'
import { gotAllProducts } from '../store/product'
//import { gotAllCategories } from '../store/category'
import Categories from './categories'
import { Link } from 'react-router-dom'
import SingleProduct from './singleProduct'
import { addToSessionCart } from '../store/order'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      orderProduct: [],
      quantity: 1
    })
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount(){
    await this.props.gotAllProducts();
  }

  handleChange(evt){
    const productId = Number(evt.target.name);
    //console.log("HEHEHHE", productId)
    const [ newOrderProduct ] = this.props.products.filter(product => product.id === productId);
    console.log("newOrderProduct", newOrderProduct)
    newOrderProduct.quantity = evt.target.value;

    this.setState({ orderProduct : [...this.state.orderProduct, newOrderProduct] })
  }

  handleSubmit(evt){
    
    evt.preventDefault();
    
    const productId = Number(evt.target[0].name)
    const orderProductSession = JSON.parse(sessionStorage.getItem('orderProduct'));
    const selectedProductInLocalState = this.state.orderProduct.filter(product => product.id === productId);
    let newOrderProductSession;
    console.log("selectedProductInLocalState", selectedProductInLocalState)
    if (!orderProductSession) {
      //if guest cart is empty then add the ONE item that they cliked on to their cart (which is in LOCAL state!) 
      sessionStorage.setItem('orderProduct', JSON.stringify(selectedProductInLocalState))
    
    } else {
      const [ selectedProductInSessionStorage ] = orderProductSession.filter(product => product.id === productId)
      //console.log("selectedProductInSessionStorage", selectedProductInSessionStorage)
      if (selectedProductInSessionStorage.id){
        //for one specific selectedItem - you want to purchase more of that ONE item (ex: lavendar, added it to cart, want to go back and add more)
        selectedProductInSessionStorage.quantity += selectedProductInLocalState.quantity
        console.log("selectedProductInSessionStorage", selectedProductInSessionStorage)
      
        newOrderProductSession = orderProductSession.map(orderProduct => {
          if (orderProduct.id === productId){
            return selectedProductInSessionStorage
          } else {
            return orderProduct
          }
        })
      
      } else{
        newOrderProductSession = [...orderProductSession, ...selectedProductInLocalState]
        console.log('newOrderProductSession', newOrderProductSession)

      }
      sessionStorage.setItem('orderProduct', JSON.stringify(newOrderProductSession))
    }
  }

  render() {
    const products = this.props.products
    //const categories = this.props.categories

    return (
          <div>
            <main>
              <h3>Scented</h3>
                  <div>
                    <Link to='/cart' >Go To Cart</Link>
                    <Categories />
                  </div>
                  <div>
                    {
                        products && products.map(product => {
                            return (
                                <SingleProduct key={product.id} product={product}  isAdmin={this.props.isAdmin} handleSubmit={this.handleSubmit} handleChange={this.handleChange} fakeQuantity={this.state.quantity}/>
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

    //categories: state.category,
    user: state.user,
    isAdmin: state.user.isAdmin

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gotAllProducts: () => dispatch(gotAllProducts()),
    //gotAllCategories: () => dispatch(gotAllCategories()),
    addToSessionCart: (order) => dispatch(addToSessionCart(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

