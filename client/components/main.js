import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { gotAllProducts } from '../store/product'

class Main extends Component {
  async componentDidMount(){
    console.log('componentDidMount working in Root')
    await this.props.gotAllProducts();
  }
  render() {
    const products = this.props.products
    return (
          <div>
            <main>
              <h3>Scented</h3>

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
