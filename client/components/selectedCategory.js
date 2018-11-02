import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSelectedCategoryThunk} from '../store/selectedCategory'
import {Link} from 'react-router-dom'

class SelectedCategory extends Component {
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.fetchSelectedCategory(id);
    }
    render() {
        const selectedCategory = this.props.selectedCategory
        const productsInCategory = selectedCategory.products
        console.log("HIII", productsInCategory )
        return (
            <div>
                <h2>{selectedCategory.content} Scents</h2>
                <div>
                {
                    productsInCategory && productsInCategory.map(product => {
                        return (
                            <li key={product.id}><Link to={`/products/${product.id}`}> {product.title}</Link></li>
                        )
                    })
                }
                </div>

                {/* <h2>The Deets!</h2>
                <h3>Scent: {selectedProduct.title}</h3>
                <img src={selectedProduct.imageUrl} alt="" className="img-responsive" />
                <h1>${selectedProduct.price}</h1>    
                <p>Description: {selectedProduct.description}</p>      */}
    
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    console.log('Mapping STATE to PROPS in selectedCategory: ', state)
    return {
        selectedCategory: state.selectedCategory,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    console.log('Mapping PROPS to STATE in selectedCategory')
    return {
        fetchSelectedCategory: id => dispatch(getSelectedCategoryThunk(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategory)
