import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { gotAllCategories } from '../store/category'

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
    const categoryMenu = categories && categories.map(category => {
        return (
            <div key={category.id}>
            <button><Link to={`/categories/${category.id}`}> {category.content}</Link></button>
            </div>
        )
    })

    return (
      <div>
        <button onClick={this.showMenu}>
          Show menu
        </button>
        {categoryMenu}
        {/* {
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
        } */}
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




// <button> Menu item 1 </button>
// <button> Menu item 2 </button>
// <button> Menu item 3 </button>


// <button onClick={this.showMenu}>
// Categories
// </button>
//   <div>
//     {
//       this.state.showMenu
//       ? (
//         <div className="menu">
//           categories && categories.map(category => {
//               return (
//                   <div key={category.id}>
//                   <button><Link to={`/categories/${category.id}`}> {category.content}</Link></button>
//                   </div>
//                   // <SingleProduct product={product} />
//               )
//           }
//         </div>
//       )
//       : (
//         null
//       )
//     }
//     </div>
