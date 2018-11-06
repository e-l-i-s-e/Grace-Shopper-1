import React, { Component } from "react";
import { connect } from 'react-redux'
import { getReviewsThunk, addReviewsThunk} from '../store/reviews'
import AddReviewForm from './addReviewForm'
import {withRouter} from "react-router"

class AddReview extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      numStars: '',
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt){
    evt.preventDefault()  
    const id = this.props.selectedProduct.id
    this.props.addReviewsThunk(this.state, id)
    console.log('props', this.props)
    this.setState({  
        firstName: '',
        numStars: '',
        content: ''
    })
  }
  render() {
  return (
      <AddReviewForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/> 
    )}
}


const mapState = (state) => {
  return {
    review: state.review,
    selectedProduct: state.selectedProduct
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    //fetchReviews: (id) => dispatch(getReviewsThunk(id)),
    addReviewsThunk: (review, id) => dispatch(addReviewsThunk(review, id))
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddReview));