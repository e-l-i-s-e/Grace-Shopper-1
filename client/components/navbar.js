import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
//import {Main} from './main'
import Search from './search'
import Categories from './categories'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>SCENTED!</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products"> All Scents </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/orders">My Orders</Link>
          <Categories />
          <Search />
          <div id='container'>
        <Link id='cart-link' to='/cart'> <img src='http://simpleicon.com/wp-content/uploads/shopping-cart-8.png' /> </Link>
          </div>
          
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/products"> All Scents </Link>
          <Link to="/signup">Sign Up</Link>
          <Categories />
          <Search />
          <div id='container'>
          <Link id='cart-link' to='/cart'> <img src='http://simpleicon.com/wp-content/uploads/shopping-cart-8.png' /> </Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
