import React, {Component} from 'react'
import { connect } from 'react-redux'

// importing thunk from product reducer
import { setEditProduct } from '../store/product'
import { getCatProd, removeCatProd } from '../store/categoryProduct'
import EditProductForm from './editProductForm'
import EditCategoryForm from './categoryEditForm'

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
      this.setState({
            title: product.title,
            description: product.description,
            price: product.price,
            inventory: product.inventory,
            imageUrl: product.imageUrl,
            id: product.id
        })
        this.props.getCatProd(this.state.id)
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

    minusHandleSubmit(e){
        e.preventDefault()
        const productId = this.state.id
        const categoryId = e.target.key
        const catProdIds = {categoryId, productId} 
        //remove thunk with catProdIds passed into it 
        this.props.removeCatProd(catProdIds)
    }

    plusHandleSubmit(e){
        e.preventDefault()
        const productId = this.state.id
        const categoryId = e.target.key
        const catProdIds = {categoryId, productId} 
        //add thunk with catProdIds passed into it 

    }

    render(){
        return(
            <div>
            <EditProductForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            <EditCategoryForm {...this.state} categoryProduct={this.props.categoryProduct} minusHandleSubmit={this.props.minusHandleSubmit} plusHandleSubmit={this.props.plusHandleSubmit}/>
            </div>
        )
    }
}

const maptStateToProps = (state)=>{
    return {
        categoryProduct: state.categoryProduct
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEditProduct: (editedProduct) => dispatch(setEditProduct(editedProduct)),
        getCatProd: (productId) =>  dispatch(getCatProd(productId))
    }
}

export default connect(maptStateToProps, mapDispatchToProps)(EditProduct)
