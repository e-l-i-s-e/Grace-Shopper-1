import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const REMOVE_CART = 'REMOVE_CART'
const GET_PRICE = "GET_PRICE"
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

/**
 * INITIAL STATE
 */

const defaultOrder = {};

/**
 * ACTION CREATORS
 */
const getOrder = order => ({ type: GET_CART, order })
const changeQuantitySuccess = updatedProduct => ({ type: CHANGE_QUANTITY, updatedProduct })
const addToCart = newItem => ({ type: ADD_TO_CART, newItem })
const removeFromCart = item => ({ type: REMOVE_CART, item })
const gotNewPrice = total => ({ type: GET_PRICE, total })
const gotOrderHistory = order => ({ type: GET_ORDER_HISTORY, order })
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
  try {
    const { data } = await axios.post(`/api/order/`, product)
    dispatch(addToCart(data))
  }
  catch (err) {
    console.error(err)
  }
}
//updates OrderProducts quantity based on changes in cart
export const changeQuantity = (product) => async dispatch => {
  try {
    const newRow = await axios.put('/api/order/', product)
    dispatch(changeQuantitySuccess(newRow.data))
  }
  catch (err) {
    console.error(err)
  }
}
export const deleteFromCart = (infoForDelete) => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/order/${infoForDelete.userId}/${infoForDelete.productId}/`)
    dispatch(removeFromCart(data))
  }
  catch (err) {
    console.error(err)
  }
}


export const getNewPrice = (orderid) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/order/price/${orderid}`)
    dispatch(gotNewPrice(data.total))
  }
  catch (err) {
    console.error(err)
  }
}
export const getOrderHistory = (userid) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/order/history/${userid}/`)
    console.log(data)
    dispatch(gotOrderHistory(data))
  }
  catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultOrder, action) {
  const newOrders = { ...state }
  switch (action.type) {
    case GET_CART:
      return {...action.order}

    case CHANGE_QUANTITY: {
      const newOrderProducts = action.updatedProduct.product.products
      const newState = { ...state };
      newState.products = newOrderProducts
      return { ...newState }
    }
    case ADD_TO_CART: {
      const newOrderProducts = action.newItem.product.products
      const newState = { ...state };
      newState.products = newOrderProducts
      return { ...newState }
    }
    case REMOVE_CART:{
      const indexOfDeleted = newOrders.products.findIndex(aProduct => {
        return aProduct.id === action.item.productId
      })
      newOrders.products.splice(indexOfDeleted, 1)
      return { ...newOrders }
    }
    case GET_PRICE:
      newOrders.total = action.total
      return { ...newOrders }

    case GET_ORDER_HISTORY:

      return action.order
    default:
      return state
  }
}
