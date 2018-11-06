import React, {Component} from 'react'
import { connect } from 'react-redux'

// importing thunk from category reducer
import { postCategory } from '../store/category'

class AddCategory extends Component {
    constructor(){
        super()
        this.state = {
            content: ''
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
        this.props.postCategory(this.state)
        this.setState({
            content: '' 
        })

    }
    render(){
        return(
            <div>
            <form id='create-category' onSubmit={this.handleSubmit}>
                <label>
                    Add Category
                </label>
                <input 
                    type="text"
                    name="content"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <div>
                    <button type="submit">submit!</button>
                </div>
            </form>

        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postCategory: (category) => dispatch(postCategory(category))
    }
}
export default connect(null, mapDispatchToProps)(AddCategory)