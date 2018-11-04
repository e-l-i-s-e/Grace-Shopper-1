import axios from 'axios'
import history from '../history'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
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
const addToCart = newItem => ({type: ADD_TO_CART, newItem})
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
export const postToCart = (product) => async dispatch => {
  try{

      const { data } = await axios.post(`/api/order/`, product)
      dispatch(addToCart(data))
      
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
    await axios.delete('/api/order/', product)
  }
  catch(err){
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  switch (action.type) {
    case GET_CART:
      return {...action.order}
    case CHANGE_QUANTITY:
      const newOrders = {...state}
      const indexOfProduct = state.products.findIndex(aProduct => {
       return aProduct.id === action.updatedProduct.productId
      })
      const newQuantity = action.updatedProduct.quantity
      newOrders.products[indexOfProduct].orderProduct.quantity = newQuantity
      return {...newOrders}
    case addToCart:
      const Orders = {...state}
      if(action.newItem.isCreate){
        Orders.products = [...Orders.products, action.newItem.product]
        return {Orders}
      } else{
        const indexOfProduct = Orders.products.findIndex(aProduct => {
          return aProduct.id === action.newItem.product.productId
         })
         const newQuantity = action.newItem.product.quantity
         Orders.products[indexOfProduct].orderProduct.quantity = newQuantity
         return {...Orders}
      }
        
    default:
      return state
  }
}
