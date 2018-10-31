import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { gotAllProducts } from '../store/product'
//importing Components:
import ProductList from './allProducts'

class Main extends Component {
  async componentDidMount(){
    console.log('componentDidMount working in Root')
    await this.props.gotAllProducts();
  }
  render() {
    console.log("heeere", this.props.products)
    const products = this.props.products
    return (
      // <BrowserRouter>
          <div>
            <main>
              <h3>Scented</h3>
              <h2>Products</h2>
                    {
                        products && products.map(product => {
                            return (
                                <div key={product.id}>
                                <li><Link to={`/products/${product.id}`}> {product.title}</Link></li>
                                <img src={product.imageUrl} alt="" className="img-responsive" />
                                </div>
                                // <SingleProduct product={product} />
                            )
                        })
                    }
            </main>
          </div>
      // </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('Mapping STATE to PROPS in Root: ', state)
  return {
    products: state.product,
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('Mapping PROPS to STATE in Root')
  return {
    gotAllProducts: () => dispatch(gotAllProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
