import { Link } from 'react-router-dom'
import './style/cartreport.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { CartProps } from '../../type/CartProps'
import { decreaseQuantity, increaseQuantity, saveCart } from '../../redux/actions/cart'
import { ProductProps } from '../../type/ProductProps'
import { useEffect, useState } from 'react'
import { handleSaveCart } from '../../util/cart/handleSaveCart'

export const CartReport = () => {
    const { cart } = useSelector((state: RootState) => state.cart)
    const { products }: { products: ProductProps[] } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>()

    const [is36, setIs36] = useState(false)




    // list of items of size 34
    const listOfSize34 = cart.filter((item: CartProps) => item.productSize[34] > 0)
    const listOfSize36 = cart.filter((item: CartProps) => item.productSize[36] > 0)

    const total34 = listOfSize34.reduce((total: number, item: CartProps) => total + item.price * item.productSize['34'], 0)
    const total36 = listOfSize36.reduce((total: number, item: CartProps) => total + item.price * item.productSize['36'], 0)

    const cartTotal = total34 + total36



    const handleIncreaseQuantityFor34 = (item: CartProps) => {
        const product = products.find((p) => p.id === item.cartId)
        if (product && item.productSize['34'] < product.productSize['34']) {
            dispatch(increaseQuantity(item.cartId, true, false))
            // handleSaveCart(dispatch, product, cart, true, false);

        }
    }
    const handleIncreaseQuantityFor36 = (item: CartProps) => {
        const product = products.find((p) => p.id === item.cartId)
        if (product && item.productSize['36'] < product.productSize['36']) {
            dispatch(increaseQuantity(item.cartId, false, true))
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
                                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                                <span>{item.productSize['34']}</span>
                                <button onClick={() => handleIncreaseQuantityFor34(item)}>+</button>
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
                                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                                <span>{item.productSize['36']}</span>
                                <button onClick={() => handleIncreaseQuantityFor36(item)}>+</button>
                            </td>
                            <td>{item.price * item.productSize['36']} €</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>Total Price:</td>
                        <td>{cartTotal} €</td>
                    </tr>
                </tfoot>
            </table>


        </div>
    )
}

