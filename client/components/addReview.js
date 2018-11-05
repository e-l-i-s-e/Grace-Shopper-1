import React, { Component } from "react";
import { connect } from 'react-redux'
import { getReviewsThunk, addReviewsThunk} from '../store/reviews'
import AddReviewForm from './addReviewForm'

class AddReview extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      numStars: '',
      review: ''
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
    //const id = this.props.match.params.id
    const id = this.props.selectedProduct.id
    this.props.addReviewsAction(this.state, id)
    console.log('props', this.props)
    this.props.history.push(`/products/:id/reviews`)
    this.setState({  
        firstName: '',
        numStars: '',
        review: ''
    })
  }
  render() {
  return (
      <AddReviewForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/> 
    )}
}


// const mapState = (state) => {
//   return {
//     review: state.review,
//     selectedProduct: state.selectedProduct
//   }
// }

const mapDispatch = (dispatch, ownProps) => {
  return {
    //fetchReviews: (id) => dispatch(getReviewsThunk(id)),
    writeReviews: (review, id) => dispatch(addReviewsThunk(review, id))
  }
}

export default connect(null, mapDispatch)(AddReview)