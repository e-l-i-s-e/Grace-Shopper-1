import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SvgIcon from '@material-ui/core/SvgIcon';
import Glass from '@material-ui/icons/Search';



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
      this.props.history.push(`/products/${productId}`)

    }

    render(){
      return (
        <div>

          <div className="box-1">
            <div className="container-1">
            <form id='search-products' onSubmit={this.handleSubmit}>
            <FontAwesomeIcon icon={faSearch} className="icon" style={{ color: 'rgb(165, 165, 165)'}}/>
              <input type="search" id="search-1" placeholder="Search . . ." value={this.state.value} onChange={this.handleChange} />
            </form>
            </div>
          </div>


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
