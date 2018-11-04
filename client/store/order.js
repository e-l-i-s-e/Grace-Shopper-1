import axios from 'axios'
import history from '../history'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_CART = 'ADD_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
// const GET_ORDER_PRODUCT = 'GET_ORDER_PRODUCT'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
// const ADD_PRODUCT = 'ADD_PRODUCT'
// const EDITED_PRODUCT = 'EDITED_PRODUCT'

/**
 * INITIAL STATE
 */

const defaultOrder = {};

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_CART, order})
// const getOrderProduct = orderProduct = ({type: GET_ORDER_PRODUCT, orderProduct})

const changeQuantitySuccess = updatedProduct => ({type: CHANGE_QUANTITY, updatedProduct})
/**
 * THUNK CREATORS
 */
//gets all orders that are in the current cart of the user
export const gotAllOrders = (userId) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/order/${userId}`)
    dispatch(getOrder(data));
  } catch (err) {
    console.error(err)
  }
}
//posts a product into the current cart of the user
export const postToCart = (product, userId) => async dispatch => {
  try{

      await axios.post(`/api/order/`, product)
      
  }
  catch(err){
    console.error(err)
  }
}
//updates OrderProducts quantity based on changes in cart
export const changeQuantity = (product) => async dispatch => {
  try{
    const newRow = await axios.put('/api/order/', product)
    console.log("NEW ROW", newRow.data)
   
    // the product needs to include
    // quantity, orderId and productId
    dispatch(changeQuantitySuccess(newRow.data))
  }
  catch(err){
    console.error(err)
  }
}
export const deleteFromCart = (product) => async dispatch => {
  try{
    await axios.delete('/api/order', product)
  }
  catch(err){
    console.error(err)
  }
}



// export const gotGuestOrder = (orderAndQuantity) => async dispatch => {
//   try {
//     dispatch(getOrderProduct(orderAndQuantity))
//   } catch (err) {

//   }
// }

// export const setNewProduct = (product) => {
//     return async (dispatch) => {
//         const { data } = await axios.post('/api/products', product)
//         dispatch(addProduct(data))
//     }
// }

// export const setEditProduct = (editedProduct) => {
//   return async(dispatch) => {
//     try{
//       const {data} = await axios.put(`/api/products/${editedProduct.id}`, editedProduct)
//       dispatch(editProduct(data[1]))
//       history.push('/adminHome')
//     }
//     catch (err){
//       console.error(err)
//     }
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  switch (action.type) {
    case GET_CART:
      return {...action.order}
    case CHANGE_QUANTITY:
      const newOrders = {...state}
      console.log("state", state)
      console.log(newOrders)
      const indexOfProduct = state.products.findIndex(aProduct => {
       return aProduct.id === action.updatedProduct.productId
      })
      const newQuantity = action.updatedProduct.quantity
      newOrders.products[indexOfProduct].orderProduct.quantity = newQuantity

      
      
      return {...newOrders}
    default:
      return state
  }
}
