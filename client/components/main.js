import React, { Component } from 'react'
import { connect } from 'react-redux';
import { gotAllProducts } from '../store/product'
import SingleProduct from './singleProduct'

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
                                <SingleProduct key={product.id} product={product} isAdmin={this.props.isAdmin} />
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
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('Mapping PROPS to STATE in Root')
  return {
    gotAllProducts: () => dispatch(gotAllProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
