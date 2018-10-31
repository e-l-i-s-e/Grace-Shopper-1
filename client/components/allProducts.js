import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { gotAllProducts } from '../store/product'


const ProductList = (props) => {
    const { products } = props;
    console.log("products", products)
    return (
            <div>
                <h2>Products</h2>
                    {
                        products && products.map(product => {
                            return (
                                <div key={product.id}>
                                <li><Link to={`/products/${product.id}`}> {product.name}</Link></li>
                                <img src={product.imageUrl} alt="" className="img-responsive" />
                                </div>
                            )
                        })
                    }
            </div>
    )
}

const mapStateToProps = (state) => {
    console.log('Mapping STATE to PROPS from ProductList: ', state)
    return {
      products: state.products
    }
}

// const mapDispatchToProps = dispatch => {
//     console.log('Mapping PROPS to STATE from ProductList:')
//     return {
//         singleCampusOnly: campus => dispatch(selectCampusAction(campus))
//     }
// };

export default connect(mapStateToProps)(ProductList)
