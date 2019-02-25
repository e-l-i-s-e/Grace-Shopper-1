import React from 'react'
import { Link } from 'react-router-dom'
import Buttons from './buttons'

const CartItems = (props) => {
  const product = props.orderProduct;
  return (
    <div className="cart-item">
      {/* props.orderProduct && */}
      <ul>
        <li><img src={product.imageUrl}/></li>
        <li><Link to={`/products/${product.id}`}>{product.title}</Link></li>
        <li className="total-price">
          <p>${((product.price)/100).toFixed(2)}</p>
        </li>
        <li><Buttons
          product={product}
          orderProduct={props.orderProduct} //?? is this not redundant?
          handleChange={props.handleChange} /></li>
        <li><button className="delete-btn" type='submit' name={product.id} onClick={props.handleSubmit}>X</button></li>
      </ul>
    </div>
  )
}

export default CartItems;
