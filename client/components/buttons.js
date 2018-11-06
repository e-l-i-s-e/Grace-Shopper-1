import React from 'react'
import { Button } from 'react-bootstrap'

const Buttons = (props) => {
  const product = props.product;
  // console.log('productBUTTON', product.product)
  let quantity = product.quantity || product.orderProduct.quantity;

  return (
    <div>
       <span>
        <Button
          type='submit'
          name='decrement'
          value={product.id}
          quantity={quantity}
          onClick={props.handleChange}
          disabled={
            quantity > 1 ? false : true
          }>-</Button>
        <p>{
          quantity
          }</p>
        <Button
          type='submit'
          name='increment'
          value={product.id}
          quantity={quantity}
          onClick={props.handleChange}
          disabled={
            quantity < product.inventory ? false : true
          } >+</Button>
        </span>
    </div>
  )

}

export default Buttons;
