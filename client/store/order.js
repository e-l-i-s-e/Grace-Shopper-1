import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const REMOVE_CART = 'REMOVE_CART'
const GET_PRICE = "GET_PRICE"
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'
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
const removeFromCart = item => ({type: REMOVE_CART, item})
const gotNewPrice = total => ({type: GET_PRICE, total})
const gotOrderHistory = order => ({type: GET_ORDER_HISTORY, order})
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
export const deleteFromCart = (infoForDelete) => async dispatch => {
  try{
    const { data }  = await axios.delete(`/api/order/${infoForDelete.userId}/${infoForDelete.productId}/`)
    console.log("DeletedRow", data.productId)
    dispatch(removeFromCart(data))
  }
  catch(err){
    console.error(err)
  }
}
export const getNewPrice = (orderid) => async dispatch => {
  try{
    const { data } = await axios.get(`/api/order/price/${orderid}`)
    console.log("THE PRICE DATA",data.total)
    dispatch(gotNewPrice(data.total))
  }
  catch(err){
    console.error(err)
  }
}
export const getOrderHistory = (userid) => async dispatch => {
  try{
    const {data} = await axios.get(`/api/order/history/${userid}/`)
    console.log(data)
    dispatch(gotOrderHistory(data))
      await axios.post('/api/order', product)
  }
  catch(err){
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  const newOrders = {...state}
  switch (action.type) {
    // case GET_CART:
    case GET_CART:
      return {...action.order}

    case CHANGE_QUANTITY:
      const indexOfProduct = state.products.findIndex(aProduct => {
       return aProduct.id === action.updatedProduct.productId
      })
      const newQuantity = action.updatedProduct.quantity
      newOrders.products[indexOfProduct].orderProduct.quantity = newQuantity
      return {...newOrders}

    case ADD_TO_CART:
      if(action.newItem.isCreate){
        newOrders.products = [...newOrders.products, action.newItem.product]
        return {...newOrders}
      } else{
        const indexOfProduct = newOrders.products.findIndex(aProduct => {
          return aProduct.id === action.newItem.product.productId
         }) 
         const newQuantity = action.newItem.product.quantity
         newOrders.products[indexOfProduct].orderProduct.quantity = newQuantity
         return {...newOrders}
      }

      case REMOVE_CART:
      const indexOfDeleted = newOrders.products.findIndex(aProduct => {
        return aProduct.id === action.item.productId
       })
       newOrders.products.splice(indexOfDeleted,1)
       return{...newOrders}
      
       case GET_PRICE:
       newOrders.total = action.total
       return {...newOrders}

       case GET_ORDER_HISTORY:

       return action.order
    default:
      return state
  }
}
