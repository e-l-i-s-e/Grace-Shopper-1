import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORY = 'GET_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'
const EDIT_CATEGORIES = 'EDIT_CATEGORIES'
// const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategory = []

/**
 * ACTION CREATORS
 */
const getCategory = category => ({type: GET_CATEGORY, category})
const addCategory = category => ({type: ADD_CATEGORY, category})
const updateCategories = categories=> ({type: EDIT_CATEGORIES,categories})
// const removeCategory = id => ({type: REMOVE_CATEGORY,id})

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


export const postCategory = newCategory => async dispatch => {
  try{
    const { data } = await axios.post('/api/categories', newCategory)
    dispatch(addCategory(data))
  } catch(err) {
    console.error(err)
}
}

export const editCategories = (categories) => async dispatch =>{
  try{
    const {data} = await axios.put('/api/categories/edit', categories)
    dispatch(updateCategories(data))
  } catch (err) {
    console.error(err)
  }
}

// export const removeCategory = categoryId => async dispatch =>  {
//   try{
//     const {data} = await axios.delete(`/api/categories/${categoryId}`)
//     dispatch(removeCategory(data))
//   } catch (err){
//     console.error(err)
// }
// }



/**
 * REDUCER
 */
export default function(state = defaultCategory, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return action.category
    case ADD_CATEGORY:
      return [...state, action.category]
    case EDIT_CATEGORIES:
      return action.category
    // case REMOVE_CATEGORY:
    //   return state.filter(category => category.id !== action.categoryId)
    default:
      return state
  }
}
