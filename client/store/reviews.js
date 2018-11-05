import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEWS = 'ADD_REVIEWS'

/**
 * INITIAL STATE
 */

const defaultReviews = [];

/**
 * ACTION CREATORS
 */
const getReviewsAction = review => ({type: GET_REVIEWS, review})
const addReviewsAction = review => ({type: ADD_REVIEWS, review})

/**
 * THUNK CREATORS
 */
export const getReviewsThunk = (productId) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/${productId}/reviews`)
    dispatch(getReviewsAction(data));
  } catch (err) {
    console.error(err)
  }
}

export const addReviewsThunk = (review, productId) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/products/${productId}/reviews`, review)
    dispatch(addReviewsAction(data));
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.review
    case ADD_REVIEWS:
      //return action.review
      return [...state, action.review]
    default:
      return state
  }
}
