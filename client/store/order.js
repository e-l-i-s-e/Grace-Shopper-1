import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
// const GET_ORDER_PRODUCT = 'GET_ORDER_PRODUCT'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
// const ADD_PRODUCT = 'ADD_PRODUCT'
// const EDITED_PRODUCT = 'EDITED_PRODUCT'

/**
 * INITIAL STATE
 */

const defaultOrder = [];

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_ORDER, order})
// const getOrderProduct = orderProduct = ({type: GET_ORDER_PRODUCT, orderProduct})

/**
 * THUNK CREATORS
 */

export const gotAllOrders = () => async dispatch => {
  try {
    // const { user } = await axios.get('/auth/me')
    // const { data } = await axios.get('/api/order')
    //  need to figure out how to send user to our front end
    // question??? how to add req.body to a get request?
    dispatch(getOrder(data));
  } catch (err) {
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
      return [...action.order]
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
