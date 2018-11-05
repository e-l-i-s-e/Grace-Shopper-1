import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_CATPROD = 'GET_CATPROD'
const REMOVE_CATPROD = 'REMOVE_CATPROD'


/**
 * INITIAL STATE
 */

const defaultCategoryProduct = {inProd: [], notInProd: []};

/**
 * ACTION CREATORS
 */

const gotCatProd = categoryProduct => ({type: GET_CATPROD, categoryProduct})
const deleteCatProd = () => ({type:REMOVE_CATPROD})

/**
 * THUNK CREATORS
 */
export const getCatProd = (productId) => async disptach => {
    try{
        const inProdres = await axios.get(`/api/products/${productId}/`)
        const inProd = inProdres.data.categories
    //    product.dataValues.categories
        const notInProdres = await axios.get('/api/categories/')
        const notInProd = notInProdres.data
        const prodData = {inProd, notInProd}
        disptach(gotCatProd(prodData))
    } catch (err){
        console.error(err)
    }
}

export const removeCatProd = (categoryInfo) => async dispatch =>{
    try{
        const deletedCategory = await axios.delete(`/${categoryInfo.productId}/${categoryInfo.categoryId}`)
        console.log(deletedCategory.data)
    } catch(err){
        console.error(err)
    }
}

/**
 * REDUCER
*/
 
export default function(state = defaultCategoryProduct, action) {
    switch (action.type) {
        case GET_CATPROD:
            const newState = {...state}
            // newState.inProd = [...action.categoryProduct.inProd]
            // newState.notInProd = [...action.categoryProduct.notInProd]
            return newState;
        case REMOVE_CATPROD:
            return newState
        default:
            return state
}
}