import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, AdminHome, AddProduct, EditProduct, AddCategory, EditCategory,
  Main, Cart, Checkout, SelectedProduct, SelectedCategory, OrderHistory, ThankYou, About} from './components'
import {me} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/" component={Main} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/thank-you" component={ThankYou}/>

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/adminHome" component={AdminHome} />
            <Route exact path="/products/add" component={AddProduct} />
            <Route exact path="/products/edit" component ={EditProduct} />
            <Route exact path="/categories/add" component={AddCategory} />
            <Route exact path="/categories/edit" component ={EditCategory} />
            <Route exact path="/products" component={Main} />
            <Route path="/products/:id" component={SelectedProduct} />
            <Route path="/categories/:id" component={SelectedCategory} />
            <Route path = '/orders' component = {OrderHistory}/>

          </Switch>
        )}
        <Route path = '/about' component = {About}/>
        <Route path="/products/:id" component={SelectedProduct} />
        <Route path="/categories/:id" component={SelectedCategory} />
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
