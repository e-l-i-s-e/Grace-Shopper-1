/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as AdminHome} from './adminHome'
export {default as AddProduct} from './addProduct'
export {default as EditProduct} from './editProduct'
export {Login, Signup} from './auth-form'


import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux';
import { gotAllProducts } from '../store/product'
//importing Components:
import ProductList from './allProducts'


class Root extends Component {
  componentDidMount(){
    console.log('componentDidMount working in Root')
    this.props.gotAllProducts();
  }
  render() {
    return (
      <BrowserRouter>
          <div>
             <Navbar />
            <main>
              <h3>Scented</h3>
                  <Switch>
                    <Route exact path="/products" component={ProductList} />
                  </Switch>
            </main>
          </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('Mapping STATE to PROPS in Root: ', state)
  return {
    products: state.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('Mapping PROPS to STATE in Root')
  return {
    gotAllProducts: () => dispatch(gotAllProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
