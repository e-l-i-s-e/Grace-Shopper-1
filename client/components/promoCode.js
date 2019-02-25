import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { me } from '../store/user'
//import {Main} from './main'

const PromoCode = ({ handlePromoSubmit }) => (
  <div>
    <form onSubmit={handlePromoSubmit}>
      <div className="form-group">
        <label>
          <h4>Promo Code</h4>
        </label>
        <input
          name="promoCode"
          type="text"
          // placeholder="promo code"
          className="form-control"
          // value=''
          // onChange={handlePromoSubmit}
        />
        <button id="applyBtn" type='submit'> Apply! </button>
      </div>
    </form>
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

export default connect(mapState, mapDispatch)(PromoCode)
