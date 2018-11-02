import React, {Component} from 'react'
import { connect } from 'react-redux'

// importing thunk from product reducer
import { gotAllOrders } from '../store/order'
import AddProductForm from './addProductForm'

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            orders: []
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if (this.props.user.id){
            this.setState = {
                orders: props.order
            }
        } else {
            //populate cart with local storage
        }
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
            price: "",
            quantity: "",
            imageUrl: "", 
        })
    }
    render(){
        return(
            <div>Hii</div>
            // <AddProductForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotAllOrders: (user) => dispatch(gotAllOrders(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)