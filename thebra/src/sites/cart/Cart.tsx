import AppBar from '../../components/appbar/AppBar'
import { CartReport } from '../../components/cartreport/CartReport'
import './style/cart.scss'
import'../../sites/productDetails/style/ProductDetails.scss'
export const Cart = () => {
    return (
        <div className="cart_container">
            <AppBar />
            <CartReport />
        </div>
    )
}