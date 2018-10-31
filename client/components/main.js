import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { gotAllProducts } from '../store/product'
import { gotAllCategories } from '../store/category'
import Categories from './categories'

class Main extends Component {
  async componentDidMount(){
    await this.props.gotAllProducts();
    await this.props.gotAllCategories();
  }

  render() {
    const products = this.props.products
    const categories = this.props.categories
    console.log("PRODUCTS!!!!", products)
    console.log("CATEGORIES!!!!!!", categories)

    return (
          <div>
            <main>
              <h3>Scented</h3>
                  <div>
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
                  </div>
                  <div>
                    {/* {
                      categories && categories.map(category => {
                        return (
                            <div key={category.id}>
                            <li><Link to={`/categories/${category.id}`}> {category.content}</Link></li>
                            </div>
                        )
                      })
                    } */}
                  </div>
            </main>
          </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('Mapping STATE to PROPS in Root: ', state)
  return {
    products: state.product,
    categories: state.category
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('Mapping PROPS to STATE in Root')
  return {
    gotAllProducts: () => dispatch(gotAllProducts()),
    gotAllCategories: () => dispatch(gotAllCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
