import axios from 'axios'

/**
 * ACTION TYPES
 */
const SELECTED_CATEGORY = 'SELECTED_CATEGORY'

/**
 * INITIAL STATE
 */

const selectedCategory = {};

/**
 * ACTION CREATORS
 */
const getSelectedCategory = category => ({type: SELECTED_CATEGORY, category})

/**
 * THUNK CREATORS
 */
export const getSelectedCategoryThunk = (id) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/categories/${id}`)
    console.log('We have Selected Cateogry Data', data)
    dispatch(getSelectedCategory(data));
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = selectedCategory, action) {
  switch (action.type) {
    case SELECTED_CATEGORY:
      return action.category
    default:
      return state
  }
}
