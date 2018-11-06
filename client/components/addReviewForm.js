import React from 'react'

const AddReviewForm = (props) => {
    return (
        <div>
        <h3>Leave a Review</h3>
          
          <form onSubmit={props.handleSubmit}>
      
            <label>
                <small>Name:</small>
            </label>
            <input 
                name="firstName" 
                type="text" 
                placeholder="First Name" 
                value={props.firstName}
                onChange={props.handleChange} 
            />

            <label>
                <small>Stars: Enter a number from 1 to 5</small>
            </label>
            <input 
                name="numStars" 
                type="number" 
                min="1" 
                max="5" 
                value={props.numStars} 
                onChange={props.handleChange} 
            />

            <label>
                <small>Review:</small>
            </label>
            <input 
                name="content" 
                type="text" 
                placeholder="Leave a review" 
                value={props.content}
                onChange={props.handleChange} 
            />

            <div>
                <button type="submit">Submit Review</button>
            </div>

          </form>
        </div>
    )
}

export default AddReviewForm;