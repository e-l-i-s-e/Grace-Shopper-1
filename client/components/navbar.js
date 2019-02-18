import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { me } from '../store/user'
//import {Main} from './main'
import Search from './search'
import Categories from './categories'
import SvgIcon from '@material-ui/core/SvgIcon';
import ShoppingCart from '@material-ui/icons/ShoppingCart';


const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <nav className="navbar navbar-inverse">
    {/* <h1 className="title">Scented</h1> */}
    <div className="container-fluid">
      {isLoggedIn ? (
        <div className="nav-item">
          {/* The navbar will show these links after you log in */}
          <ul>
            {/* <li>
            <img src={"scented-logo.png"}alt={"logo for Scented"}>
            </li> */}
            <li><Link to="/"> All Scents </Link></li>
            <li><a href="#" onClick={handleClick}>
              Logout
          </a></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Categories /></li>
            <li><Search /></li>
            {/* <li><div id='container'>
        <Link id='cart-link' to='/cart'> <img src='http://simpleicon.com/wp-content/uploads/shopping-cart-8.png' /> </Link>
          </div></li> */}
          </ul>

          <h2>Welcome, {user.email}</h2>
        </div>
      ) : (
          <div className="nav-item">
            {/* The navbar will show these links before you log in */}


            <ul className="nav navbar-nav">
              <li id="logo-brand"><Link to="/">
                <img
                height="50" width="140"
                src="scented-logo.png" alt="logo for Scented" /></Link>
              </li>
              {/* </ul> */}
              {/* <Link to="/signup">Sign Up</Link> */}
              {/* <ul className="nav navbar-nav navbar-right"> */}
              <li id="cart"><Link to="/cart"><SvgIcon><ShoppingCart /> </SvgIcon></Link></li>
              <li id="login"><Link to="/login">Login</Link></li>
              <li id="search"><Search /></li>
            <li id="about"><Categories /></li>
            <li id="scents"><Link to="/" > All Scents </Link></li>
             {/* <li id="categories"><Categories /></li> */}
            </ul>

          </div>
        )}
    </div>
    <hr />
  </nav>
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
