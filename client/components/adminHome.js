import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Main from './main'
import {Link} from 'react-router-dom'

export const AdminHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Link to='/products/add'>Add Product</Link>
      <br />
      <Link to='/categories/add'>Add Category</Link>
      <Main />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  email: PropTypes.string
}
