import AppBar from '../../components/appbar/AppBar'
import { CartReport } from '../../components/cartreport/CartReport'
import './style/cart.scss'
export const Cart = () => {
    return (
        <div className="cart_container">
            <AppBar />
            <CartReport />
        </div>
    )
}