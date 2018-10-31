import React, {Component} from 'react'
import { connect } from 'react-redux'

// importing thunk from product reducer
import { setEditProduct } from '../store/product'
import EditProductForm from './editProductForm'

class EditProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: "",
            price: "",
            inventory: "",
            imageUrl: "",
            id: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
      const product = this.props.history.location.state.product;
      console.log('CDM Product', product)
      this.setState({
            title: product.title,
            description: product.description,
            price: product.price,
            inventory: product.inventory,
            imageUrl: product.imageUrl,
            id: product.id
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.setEditProduct(this.state)

    }
    render(){
      console.log('EditProduct.js - props', this.props)
        return(
            <EditProductForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEditProduct: (editedProduct) => dispatch(setEditProduct(editedProduct))
    }
}

export default connect(null, mapDispatchToProps)(EditProduct)
