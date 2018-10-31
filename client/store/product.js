import axios from 'axios'
import history from '../history'
import { runInNewContext } from 'vm';

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
export const gotAllProducts = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/products')
    dispatch(getProduct(data));
  } catch (err) {
    console.error(err)
  }
}

export const setNewProduct = (product) => {
    return async (dispatch) => {
        const { data } = await axios.post('/api/products', product)
        dispatch(addProduct(data))
    }
}

export const setEditProduct = (editedProduct) => {
  return async(dispatch) => {
    try{
      console.log('EDITED PRODUCT', editedProduct);
      const {data} = await axios.put(`/api/products/edit/${editedProduct.id}`, editedProduct)
      dispatch(editProduct(data[1]))
      history.push('/adminHome')
    }
    catch (err){
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return [...action.product]
    case ADD_PRODUCT:
      return [...state, action.product]
    case EDITED_PRODUCT: {
      const newProducts = state.filter(product => product.id!== Number(action.editedProduct.id))
      return [...newProducts, action.editedProduct]
    }
    case REMOVE_PRODUCT:
      return defaultProduct
    default:
      return state
  }
}
