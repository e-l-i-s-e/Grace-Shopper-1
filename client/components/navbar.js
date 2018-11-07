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
        <div className="nav-item">
          {/* The navbar will show these links after you log in */}
          <ul>
          <li><Link to="/"> All Scents </Link></li>
          <li><a href="#" onClick={handleClick}>
            Logout
          </a></li>
          <li><Link to="/orders">My Orders</Link></li>
          <li><Categories /></li>
          <li><Search /></li>
          <li><div id='container'>
        <Link id='cart-link' to='/cart'> <img src='http://simpleicon.com/wp-content/uploads/shopping-cart-8.png' /> </Link>
          </div></li>
          </ul>
          
          <h2>Welcome, {user.email}</h2>
        </div>
      ) : (
        <div className="nav-item">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
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
