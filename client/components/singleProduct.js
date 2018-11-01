import React from 'react'
import {Link} from 'react-router-dom'

const SingleProduct = (props) => {
  const product = props.product;

  return (
    <div>
      <li><Link to={`/products/${product.id}`}> {product.title}</Link></li>
      <img src={product.imageUrl} alt="" className="img-responsive" />
      <form id='add-button' onSubmit={props.handleSubmit}>
        <input type="text" name={product.id}  onChange={props.handleChange}/>
        <button type='submit' value={product.id} >Add to Cart</button>
      </form>
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
