import axios from 'axios'

/**
 * ACTION TYPES
 */
const SELECTED_PRODUCT = 'SELECTED_PRODUCT'

/**
 * INITIAL STATE
 */

const selectedProduct = {};

/**
 * ACTION CREATORS
 */
const getSelectedProduct = product => ({type: SELECTED_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const getSelectedProductThunk = (id) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(getSelectedProduct(data));
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = selectedProduct, action) {
  switch (action.type) {
    case SELECTED_PRODUCT:
      return action.product
    default:
      return state
  }
}
