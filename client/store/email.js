import axios from 'axios'



export const sendEmail = (email) => async dispatch => {
  try{
    console.log('thunk email',  email)
    await axios.post('/api/email', {email})
  }
  catch(err){
    console.error(err)
  }
}
