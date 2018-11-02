import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSelectedProductThunk} from '../store/selectedProduct'

class SelectedProduct extends Component {
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.fetchSelectedProduct(id);
    }
    render() {
        const selectedProduct = this.props.selectedProduct
        return (
            <div>
                <h2>The Deets!</h2>
                <h3>Scent: {selectedProduct.title}</h3>
                <img src={selectedProduct.imageUrl} alt="" className="img-responsive" />
                <h1>${selectedProduct.price}</h1>    
                <p>Description: {selectedProduct.description}</p>     
    
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    console.log('Mapping STATE to PROPS in selectedProduct: ', state)
    return {
        selectedProduct: state.selectedProduct,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    console.log('Mapping PROPS to STATE in selectedProduct')
    return {
        fetchSelectedProduct: id => dispatch(getSelectedProductThunk(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct)
