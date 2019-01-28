import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { gotAllCategories } from '../store/category'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Categories extends Component {
  constructor(){
    super();
    this.state = {
      showMenu: false,
    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }
  async componentDidMount(){
    await this.props.gotAllCategories();
  }
  render() {
    const categories = this.props.categories
    console.log('cat', categories);

    const categoryMenu = categories[0] && categories.map(category => {
      return (
          <div key={category.id}>
          <Link className="ind-categories"  to={`/categories/${category.id}`}> {category.content}</Link>
          </div>
      )
    })

    return (
      <div className="dropdown">
        <button id="categories" onClick={this.showMenu}>
         Categories
        <FontAwesomeIcon icon={faCaretDown} style={{ color: 'rgb(165, 165, 165)', marginLeft: '5px'}} />
        </button>
        {
          this.state.showMenu
            ? (
              <div
              className="menu"
              ref={(element) => {
                this.dropdownMenu = element;
              }}
              >
              {categoryMenu}
              </div>
            )
            : (
              null
            )


        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gotAllCategories: () => dispatch(gotAllCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
