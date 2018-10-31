import React, {Component} from 'react'
import { connect } from 'react-redux'

// importing thunk from product reducer
import { setEditProduct } from '../store/product'
import EditProductForm from './editProductForm'

class EditProduct extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            description: "",
            price: "",
            inventory: "",
            imageUrl: "" ,
            id: ""

        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        this.setState({
            title: 'FLOWER',
            description: 'FLOWERY',
            price: 1.00,
            inventory: 1,
            imageUrl: 'img.png',
            id: 1
        })
    }
    //     this.setState({
    //         title: this.props.title,
    //         description: this.props.description,
    //         price: this.props.price,
    //         inventory: this.props.inventory,
    //         imageUrl: this.props.imageUrl
    //     })
    // }
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