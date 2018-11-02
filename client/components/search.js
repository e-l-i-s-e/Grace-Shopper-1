import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router-dom";


class Search extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            products: []
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            name: e.target.value
        })
    }
    handleSubmit(e){
      e.preventDefault();
      let name = this.state.name.toLowerCase();
      name = name[0].toUpperCase() + name.slice(1);
      const [ searchResult ] = this.props.products.filter(product => product.title === name);
      const productId = searchResult.id;
      console.log('product', searchResult);
      // console.log('props', this.props.context.router);
      // return <Redirect to={`/products/${productId}`} />
      this.props.history.push(`/products/${productId}`)

    }

    render(){
        return(
          <div>
            <form id='search-products' onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <button type='submit'>Go!</button>
            </form>
            <div>
              {
                this.state.products && this.state.products.map(product => {
                  return (
                    <div key={product.id}>
                    <li><Link to={`/products/${product.id}`}> {product.title}</Link></li>
                    <img src={product.imageUrl} alt="" className="img-responsive" />
                    <div >
                      <p>${product.price}</p>
                    </div>
                    <form id='add-button' onSubmit={this.handleSubmit}>
                    {/* <select onChange={this.handleChange}>
                      <option></option>
                    </select> */}
                    </form>
                    </div>

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
    products: state.product
  }
}


export default connect(mapStateToProps)(withRouter(Search))
