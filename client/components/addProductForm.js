import React from 'react'


const AddProductForm = (props) => {
    return (
        <div>
            <form id='create-product' onSubmit={props.handleSubmit}>
                <label>
                    Product Title
                </label>
                <input
                    type="text"
                    name="title"
                    value={props.title}
                    onChange={props.handleChange}
                />

                <label>
                    Description
                </label>
                <input
                    type="text"
                    name="description"
                    value={props.description}
                    onChange={props.handleChange}
                />

                <label>
                    Price
                </label>
                <input
                    type="text"
                    name="price"
                    value={props.price}
                    onChange={props.handleChange}
                />

                <label>
                    Inventory
                </label>
                <input
                    type="text"
                    name="inventory"
                    value={props.inventory}
                    onChange={props.handleChange}
                />

                <label>
                    ImageUrl
                </label>
                <input
                    type="text"
                    name="imageUrl"
                    value={props.imageUrl}
                    onChange={props.handleChange}
                />

                <div>
                    <button type="submit">submit!</button>
                </div>
            </form>

        </div>
    )
}

export default AddProductForm;
