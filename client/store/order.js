import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const ADD_CART = 'ADD_CART'
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
const getOrder = order => ({type: GET_ORDER, order})
// const getOrderProduct = orderProduct = ({type: GET_ORDER_PRODUCT, orderProduct})
const addCart = order => ({type: ADD_CART, order})
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
      await axios.post('/api/order', product)

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
    case GET_ORDER:

      return {...action.order}
    // case ADD_PRODUCT:
    //   return [...state, action.product]
    // case EDITED_PRODUCT: {
    //   const newProducts = state.filter(product => product.id!== Number(action.editedProduct.id))
    //   return [...newProducts, action.editedProduct]
    // }
    // case REMOVE_PRODUCT:
    //   return defaultProduct
    default:
      return state
  }
}
