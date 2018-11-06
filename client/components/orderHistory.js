import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { getOrderHistory } from '../store/order'

class OrderHistory extends Component {
    constructor(){
        super()

    }
    componentDidMount(){
        this.props.getOrderHistory(this.props.user.id)
    }
    render(){
        return (
            <div>
                {
                    this.props.order.length&&
                    this.props.order.map((order, i)=> {
                        return (
                            <div key={order.id}>
                                <div>Order {i+1}</div>
                                <div >{order.status} </div>
                                <div>created {order.createdAt}</div>
                                <div>
                                    {
                                        order.products.map(product => {
                                            return (
                                            <div key={product.id}>
                                                <div>{product.title}</div>
                                                <img src={product.imageUrl} alt="" className="img-responsive" />
                                            </div>
                                            )
                                        })
                                    }
                                    <br/>
                                </div>

                            </div>
                        )
                        // Current order status
                        // Items with quantity and subtotal
                        // Link to the original product detail page
                        // Date/time order was created
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      products: state.product,
      order: state.order,
      user: state.user,
      isAdmin: state.user.isAdmin
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        getOrderHistory: (userid) => dispatch(getOrderHistory(userid))
     }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
