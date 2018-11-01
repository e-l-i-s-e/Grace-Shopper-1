import React, {Component} from 'react'
import { connect } from 'react-redux'

// importing thunk from product reducer
import { setNewProduct } from '../store/product'
import AddProductForm from './addProductForm'

//add a select item button on the main view page and individual for customer to purchase product
//it will either add data to database (validated user) OR to sessionStorage
// it should be an array of objects - that should contain quanitity (that we keep track of!)
// from ORDER PRODUCT (which has all the fields we need)
// we can eager load or join them if needed

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            items: [],
            isLoggedIn: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if (this.props.user.id){
            //populate local state with the session
        } else {
            const order = sessionStorage.getItem('order')
            if (order) {
              this.setState(order)
            }  
            this.setState({isLoggedIn: false})
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        // need to add to sessionStorage 
        if (!this.state.isLoggedIn){
            sessionStorage.setItem('order', this.state)
        } 
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.setNewProduct(this.state)
        this.setState({
            items: [],
            isLoggedIn: ''
        })
    }
    render(){
        // return(
        //     <AddProductForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        // )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    // return {
    //     setNewProduct: (newProduct) => dispatch(setNewProduct(newProduct))
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)