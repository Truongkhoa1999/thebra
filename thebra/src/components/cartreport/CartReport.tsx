import { Link } from 'react-router-dom'
import './style/cartreport.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ProductProps } from '../../type/ProductProps'
import { cartTotal, findListOfSize34, findListOfSize36, handleDecreaseQuantityFor34, handleDecreaseQuantityFor36, handleIncreaseQuantityFor34, handleIncreaseQuantityFor36 } from '../../util/cart/computeCart'
import { CartProps } from '../../type/CartProps'


export const CartReport = () => {
    const { cart } = useSelector((state: RootState) => state.cart)
    const { products }: { products: ProductProps[] } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>()


    // list of items of size 34
    const listOfSize34 = findListOfSize34(cart)
    const listOfSize36 = findListOfSize36(cart)



    return (
        <div className="cartreport_container">
            <div className='heading'>
                <h1>Your Cart</h1>
                <Link to={`/allproducts`} >
                    <h5>Continue shopping</h5>
                </Link></div>
            {/* main table */}
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfSize34.map((item: CartProps, index: number) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>
                                {item.productSize[34] > 0 && <span>34</span>}
                            </td>
                            <td>
                                <button onClick={() => handleDecreaseQuantityFor34(item, dispatch)}>-</button>
                                <span>{item.productSize['34']}</span>
                                <button onClick={() => handleIncreaseQuantityFor34(products, item, dispatch)}>+</button>
                            </td>
                            <td>{item.price * item.productSize['34']} €</td>
                        </tr>
                    ))}
                    {/* 36 */}
                    {listOfSize36.map((item: CartProps, index: number) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>
                                {item.productSize[36] > 0 && <span>36</span>}
                            </td>
                            <td>
                                <button onClick={() => handleDecreaseQuantityFor36(item, dispatch)}>-</button>
                                <span>{item.productSize['36']}</span>
                                <button onClick={() => handleIncreaseQuantityFor36(products, item, dispatch)}>+</button>
                            </td>
                            <td>{item.price * item.productSize['36']} €</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>Total Price:</td>
                        <td>{cartTotal(cart)} €</td>
                    </tr>
                </tfoot>
            </table>


        </div>
    )
}

