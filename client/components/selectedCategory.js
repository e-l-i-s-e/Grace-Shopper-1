import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSelectedCategoryThunk} from '../store/selectedCategory'
import {Link} from 'react-router-dom'

class SelectedCategory extends Component {
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.fetchSelectedCategory(id);
    }
    render() {
        const selectedCategory = this.props.selectedCategory
        const productsInCategory = selectedCategory.products
        return (
            <div>
                <h2>{selectedCategory.content} Scents</h2>
                <div>
                {
                    productsInCategory && productsInCategory.map(product => {
                        return (
                            <li key={product.id}><Link to={`/products/${product.id}`}> {product.title}</Link></li>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedCategory: state.selectedCategory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSelectedCategory: id => dispatch(getSelectedCategoryThunk(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategory)
