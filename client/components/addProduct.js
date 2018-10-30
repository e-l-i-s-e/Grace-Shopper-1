import React, {Component} from 'react'
import { connect } from 'react-redux'

// importing thunk from product reducer
import { setNewProduct } from '../store/product'
import AddProductForm from './addProductForm'

class AddProduct extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            description: "",
            price: 0,
            inventory: 0,
            imageUrl: ""  

        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.setNewProduct(this.state)
        this.setState({
            title: '',
            description: "",
            price: 0,
            inventory: 0,
            imageUrl: ""  
        })

    }
    render(){
        return(
            <AddProductForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNewProduct: (newProduct) => dispatch(setNewProduct(newProduct))
    }
}
export default connect(null, mapDispatchToProps)(AddProduct)