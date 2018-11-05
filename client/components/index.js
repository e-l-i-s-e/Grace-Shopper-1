/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as AdminHome} from './adminHome'
export {default as AddProduct} from './addProduct'
export {default as Main} from './main'
export {default as EditProduct} from './editProduct'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as Categories} from './categories'
export {default as SelectedProduct} from './selectedProduct'
export {default as SelectedCategory} from './selectedCategory'
export {default as AddReview} from './addReview'
export {default as TakeMoney} from './takeMoney'

export {Login, Signup} from './auth-form'