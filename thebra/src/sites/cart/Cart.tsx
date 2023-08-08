import AppBar from '../../components/appbar/AppBar'
import { CartReport } from '../../components/cartreport/CartReport'
import './style/cart.scss'
import'../../sites/productDetails/style/ProductDetails.scss'
import { Footer } from '../../components/footer/Footer'
export const Cart = () => {
    return (
        <div className="cart_container">
            <AppBar />
            <CartReport />
            <Footer />
        </div>
    )
}