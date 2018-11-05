import axios from 'axios'
import history from '../history'

//need removeCart action!!! from order?

export const sendStripePayment = (cardDetails, amount, orderId, email) => async dispatch => {
    try {
        const { data } = await axios.post('/api/checkout/', { cardDetails, amount, orderId, email })
        //dispatch(removeCart());
        history.push('/adminHome'); //or just '/'?
    } catch (err) {
        console.error(err)
    }
}