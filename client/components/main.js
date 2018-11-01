import React, { Component } from 'react'
import { connect } from 'react-redux';
//import {Link} from 'react-router-dom'
import { gotAllProducts } from '../store/product'
//import { gotAllCategories } from '../store/category'
import Categories from './categories'
import { Link } from 'react-router-dom'
import SingleProduct from './singleProduct'

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
    const [ newOrderProduct ] = this.props.products.filter(product => product.id === productId);
    newOrderProduct.quantity = evt.target.value;
    this.setState({ orderProduct : [...this.state.orderProduct, newOrderProduct] })
  }

  handleSubmit(evt){
    evt.preventDefault();

    if (!this.props.user.id){
      sessionStorage.setItem('orderProduct', JSON.stringify(this.state.orderProduct))
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

