import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { me } from '../store/user'
//import {Main} from './main'
import Search from './search'
import Categories from './categories'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <h1>SCENTED!</h1>
    <nav>
      {isLoggedIn ? (
        <div class="nav-item">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/"> All Scents </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/orders">My Orders</Link>
          <Categories />
          <Search />
          <div id='container'>
        <Link id='cart-link' to='/cart'> <img src='http://simpleicon.com/wp-content/uploads/shopping-cart-8.png' /> </Link>
          </div>
          
          <h2>Welcome, {user.email}</h2>
        </div>
      ) : (
        <div class="nav-item">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
<<<<<<< HEAD
=======
          <Link to="/"> All Scents </Link>
>>>>>>> feature-styling
          <Link to="/signup">Sign Up</Link>
          <Link to="/"> All Scents </Link>
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
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    me: () => dispatch(me())
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
