import React from 'react'
import { Link } from 'react-router-dom'
import Buttons from './buttons'

const CartItems = (props) => {
  const product = props.orderProduct;

  return (
    <div>
      <div>
        <li><Link to={`/products/${product.id}`}>{product.title}</Link></li>
        <img src={product.imageUrl} className="img-responsive" />
        <div>
          <p>${product.price}</p>
        </div>
        <Buttons
          product={product}
          orderProduct={props.orderProduct}
          handleChange={props.handleChange} />
        <button type='submit' name={product.id} onClick={props.handleSubmit}>Remove from Cart</button>
      </div>
    </div>
  )
}

export default CartItems;
