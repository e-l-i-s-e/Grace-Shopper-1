import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'


/**
 * INITIAL STATE
 */

const defaultProduct = {}


/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const removeProduct = () => ({type: REMOVE_PRODUCT})
const addProduct = (product) => ({type: ADD_PRODUCT, product})

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
=======
export const setNewProduct = (product) => {
    return async (dispatch) => {
        const { data } = await axios.post('/api/products', product)
        dispatch(addProduct(data))
    }
}


/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case ADD_PRODUCT: 
        return action.product
    case GET_PRODUCT:
      return action.product
    case REMOVE_PRODUCT:
      return defaultProduct
    default:
      return state
  }
}
