import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
    products:[]
}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})


/**
 * THUNK CREATORS
 */
export const gotAllProducts = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/products')
    dispatch(getProduct(data));
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, products: action.products}
    default:
      return state
  }
}
