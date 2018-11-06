import React from 'react'
import {Link} from 'react-router-dom'
import Buttons from './buttons'

const SingleProduct = (props) => {
  const product = props.orderProduct;

  return (
    <div id='singleProduct' className='column'>
      <img src={product.imageUrl} alt="" className="img-responsive" />
      <Link to={`/products/${product.id}`}>{product.title}</Link>
      <div >
        <p>${product.price}</p>
      </div>
      <div>
        <Buttons
          product={product}
          orderProduct={props.orderProduct}
          handleChange={props.handleChange} />
      </div>
        <button
          type='submit'
          name={product.id}
          onClick={props.handleSubmit}
        >
          Add to Cart
        </button>
      <div>
      {
        props.isAdmin &&
        (<Link to={{
          pathname:'/products/edit',
          state: {product}
        }}>Edit</Link>)
      }
      </div>
    </div>
  )
}

export default SingleProduct;
