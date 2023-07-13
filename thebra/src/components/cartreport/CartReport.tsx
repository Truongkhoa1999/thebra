import { Link } from 'react-router-dom'
import './style/cartreport.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { CartProps } from '../../type/CartProps'
import { decreaseQuantity, increaseQuantity } from '../../redux/actions/cart'
import { ProductProps } from '../../type/ProductProps'
export const CartReport = () => {
    const { cart } = useSelector((state: RootState) => state.cart)
    const { products }: { products: ProductProps[] } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>()
    const totalPrice = cart.reduce(
        (total: number, item: CartProps) => total + item.price * item.quantity,
        0
    )
    const handleIncreaseQuantity = (item: CartProps) => {
        const product = products.find((p) => p.id === item.cartId)
        if (product && item.productSize[0] <= product.productSize[0] && item.productSize[1] <= product.productSize[1]) {
            dispatch(increaseQuantity(item.cartId))
        }
    }
    const handleDecreaseQuantity = (item: CartProps) => {
        if (item.productSize[1] > 0) {
            dispatch(decreaseQuantity(item.cartId))
        }
    }
    return (
        <div className="cartreport_container">
            <div className='heading'>
                <h1>Your Cart</h1>
                <Link to={`/allproducts`} >
                    <h5>Continue shopping</h5>
                </Link></div>
            {/* main table */}
            <table className="cart">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item: CartProps, index: number) => {


                        return (
                            <tr key={`${item.cartId}-${index}`}>
                                <td>{item.title}</td>
                                <td>
                                    <div className="quantity_group">
                                        <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                                    </div>
                                </td>
                                <td>{item.price * item.quantity} €</td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>Total Price:</td>
                        <td>{totalPrice} €</td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}