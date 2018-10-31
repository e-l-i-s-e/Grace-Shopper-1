import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDITED_PRODUCT = 'EDITED_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = [];

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const removeProduct = () => ({type: REMOVE_PRODUCT})
const addProduct = (product) => ({type: ADD_PRODUCT, product})
const editProduct = (editedProduct) => ({type: EDITED_PRODUCT, editedProduct}) 

/**
 * THUNK CREATORS
 */
export const setNewProduct = (product) => {
    return async (dispatch) => {
        const { data } = await axios.post('/api/products', product)
        dispatch(addProduct(data))
    }
}

export const setEditProduct = (editedProduct) => {
  return async(dispatch) => {
    const {data} = await axios.put(`/api/product/edit/${editedProduct.id}`, editedProduct)
    dispatch(editProduct(data[1]))
  }
}


/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case ADD_PRODUCT:
        return [...state, action.product]
    case GET_PRODUCT:
      return action.product
    case EDITED_PRODUCT: {
      const newProducts = state.filter(product => product.id!== Number(action.editedProduct.id))
      return [...newProducts, action.editProduct]
    } 
    case REMOVE_PRODUCT:
      return defaultProduct
    default:
      return state
  }
}
