import { useSelector } from 'react-redux'
import AppBar from '../../components/appbar/AppBar'
import { CartReport } from '../../components/cartreport/CartReport'
import './style/cart.scss'
import { RootState } from '../../redux/store'
import'../../sites/productDetails/style/ProductDetails.scss'
export const Cart = () => {
    const { products } = useSelector((state: RootState) => state.products)
    return (
        <div className="cart_container">
            <AppBar />
            <CartReport />
        </div>
    )
}