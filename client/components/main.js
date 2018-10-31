import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { gotAllProducts } from '../store/product'
import { gotAllCategories } from '../store/category'
import Categories from './categories'

import SingleProduct from './singleProduct'

class Main extends Component {
  async componentDidMount(){
    await this.props.gotAllProducts();
    await this.props.gotAllCategories();
  }

  render() {
    const products = this.props.products
    const categories = this.props.categories

    return (
          <div>
            <main>
              <h3>Scented</h3>
                  <div>
                    {
                      categories[0] && categories.map(category => {
                        return (
                            <div key={category.id}>
                            <li><Link to={`/api/categories/${category.id}`}> {category.content}</Link></li>
                            </div>
                        )
                      })
                    }  
                  </div>
                  <div>
                    {
                        products && products.map(product => {
                            return (
                                <SingleProduct key={product.id} product={product} isAdmin={this.props.isAdmin} />
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

    categories: state.category,

    isAdmin: state.user.isAdmin

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gotAllProducts: () => dispatch(gotAllProducts()),
    gotAllCategories: () => dispatch(gotAllCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

