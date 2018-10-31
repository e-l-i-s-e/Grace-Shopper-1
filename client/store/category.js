import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORY = 'GET_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategory = []

/**
 * ACTION CREATORS
 */
const getCategory = category => ({type: GET_CATEGORY, category})

/**
 * THUNK CREATORS
 */
export const gotAllCategories = () => async dispatch => {
    try {
      const { data } = await axios.get('/api/categories')
      dispatch(getCategory(data));
    } catch (err) {
      console.error(err)
    }
}

/**
 * REDUCER
 */
export default function(state = defaultCategory, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return action.category
    default:
      return state
  }
}
