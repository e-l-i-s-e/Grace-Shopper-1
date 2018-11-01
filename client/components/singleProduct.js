import React from 'react'
import {Link} from 'react-router-dom'

const SingleProduct = (props) => {
  const product = props.product;

  return (
    <div>
      <li><Link to={`/products/${product.id}`}> {product.title}</Link></li>
      <img src={product.imageUrl} alt="" className="img-responsive" />
      <button>Add to Cart</button>
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
