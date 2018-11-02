import React from 'react'
import {Link} from 'react-router-dom'

const CartItems = (props) => {
  
  const product = props.orderProduct;
  console.log('PRODUCT', props.orderProduct)
  
  return (
    
    <div>
      {
        
        props.orderProduct && 
      <div>
      <li><Link to={`/products/${product.id}`}> {product.title}</Link></li>
      <img src={product.imageUrl} alt="" className="img-responsive" />
      <div >
        <p>${product.price}</p>
      </div>
      <form id='add-button' onSubmit={props.handleSubmit}>
        <input 
        type="text" name={product.id} 
        value={product.quantity ? product.quantity : 1} 
        onChange={props.handleChange}/>
      </form>
      </div>
      }
    </div>
    
  )
}



export default CartItems;
