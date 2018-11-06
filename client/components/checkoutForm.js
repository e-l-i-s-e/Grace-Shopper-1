import React from 'react'

const CheckoutForm = (props) => {
    return (
        <div>
        <h2>Checkout!</h2>

          <form onSubmit={props.handleSubmit}>

            <div className="form-group">
            {/* <label>
                <small>Email:</small>
            </label> */}
            <input
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
                value={props.email}
                onChange={props.handleChange}
            />
            </div>

            <div className="form-group">
            {/* <label>
                <small>First Name:</small>
            </label> */}
            <input
                name="firstName"
                type="text"
                placeholder="First name"
                className="form-control"
                value={props.firstName}
                onChange={props.handleChange}
            />
            </div>

            <div className="form-group">
            {/* <label>
                <small>Last Name:</small>
            </label> */}
            <input
                name="lastName"
                type="text"
                placeholder="Last name"
                className="form-control"
                value={props.lastName}
                onChange={props.handleChange}
            />
            </div>

            {/* <br /> */}

            <div className="form-group">
            {/* <label>
                <small>Street Address 1:</small>
            </label> */}
            <input
                name="streetAddress1"
                type="text"
                placeholder="Address"
                className="form-control"
                value={props.streetAddress1}
                onChange={props.handleChange}
            />
            </div>

            {/* <br /> */}

            <div className="form-group">
            {/* <label>
                <small>Street Address 2:</small>
            </label> */}
            <input
                name="streetAddress2"
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="form-control"
                value={props.streetAddress2}
                onChange={props.handleChange}
            />
            </div>

            {/* <br /> */}

            <div className="form-group">
            {/* <label>
                <small>City:</small>
            </label> */}
            <input
                name="city"
                type="text"
                placeholder="City"
                className="form-control"
                value={props.city}
                onChange={props.handleChange}
            />
            </div>

            {/* <br /> */}

            <div className="form-group">
            {/* <label>
                <small>Country:</small>
            </label> */}
            <input
                name="country"
                type="text"
                placeholder="Country"
                className="form-control"
                value={props.country}
                onChange={props.handleChange}
            />
            </div>

            <div className="form-group">
            {/* <label>
                <small>State:</small>
            </label> */}
            <input
                name="state"
                type="text"
                placeholder="State"
                className="form-control"
                value={props.state}
                onChange={props.handleChange}
            />
            </div>

            <div className="form-group">
            {/* <label>
                <small>Zip Code:</small>
            </label> */}
            <input
                name="zipCode"
                type="text"
                placeholder="ZIP code"
                className="form-control"
                value={props.zipCode}
                onChange={props.handleChange}
            />
            </div>

            {/* <br /> */}

            <div className="form-group">
            {/* <label>
                <small>Phone:</small>
            </label> */}
            <input
                name="phone"
                type="text"
                placeholder="Phone"
                className="form-control"
                value={props.phone}
                onChange={props.handleChange}
            />
            </div>

            <div>
                <button type="submit">Submit</button>
            </div>

          </form>
        </div>
    )
}

export default CheckoutForm;
