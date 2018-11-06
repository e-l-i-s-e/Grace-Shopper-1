import React from 'react'
import {Link} from 'react-router-dom'
import Buttons from './buttons'
import ToastAddedToCart from './toastNotification'
//import { ToastConsumer, ToastProvider, withToastManager } from 'react-toast-notifications';
import { withToastManager } from 'react-toast-notifications';
import {Grid, Col, Thumbnail, Row, Button} from 'react-bootstrap'


// import { withToastManager } from 'react-toast-notifications';

// const Demo = ({ content, toastManager }) => (
//   <Button onClick={() => toastManager.add(content, {
//     appearance: 'error',
//     autoDismiss: true,
//   })}>
//     Add Toast
//   </Button>
// );

// export const ToastDemo = withToastManager(Demo);


const SingleProduct = (props) => {
  const product = props.orderProduct;

  return (
    // <div id='singleProduct' className='column'>
    //   <img src={product.imageUrl} alt="" className="img-responsive" />
    //   <Link to={`/products/${product.id}`}>{product.title}</Link>
    //   <    <Grid>div >
    //     <p>${((product.price)/100).toFixed(2)}</p>
    //   </div>
    //   <div>
    //     <Buttons
    //       product={product}
    //       orderProduct={props.orderProduct}
    //       handleChange={props.handleChange} />
    //   </div>
    //     <button
    //       type='submit'
    //       name={product.id}
    //       onClick={props.handleSubmit}
    //     >
    //       Add to Cart
    //       {/* <ToastAddedToCart /> */}
    //     </button>
    //   <div>
    //   {
    //     props.isAdmin &&
    //     (<Link to={{
    //       pathname:'/products/edit',
    //       state: {product}
    //     }}>Edit</Link>)
    //   }
    //   </div>
    // </div>
    <Grid>
      <Row>
        <Col xs={6} md={4}>
        <Thumbnail src={product.imageUrl} alt="242x200" >
      
        <h3><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
        <p>${((product.price)/100).toFixed(2)}</p>
        <p>
          <Buttons product={product} orderProduct={props.orderProduct}
          handleChange={props.handleChange} />
          &nbsp;
          <Button bsStyle="default"
                    type='submit' name={product.id} onClick={props.handleSubmit}>
                    Add To Cart</Button>
        </p>
      </Thumbnail>
      <div>
        {
        props.isAdmin &&
        (<Link to={{
          pathname:'/products/edit',
          state: {product}
        }}>Edit</Link>)
      }
      </div>
    </Col>
    </Row>
    </Grid>
  )
}
//export const ToastDemo = withToastManager(SingleProduct);
export default SingleProduct;
