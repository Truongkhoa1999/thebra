import { useSelector } from "react-redux"
import { deleteCartItem, saveCart } from "../../redux/actions/cart"
import { AppDispatch, RootState } from "../../redux/store"
import { CartProps } from "../../type/CartProps"
import { findListOfSize34, findListOfSize36, handleDecreaseQuantityFor34, handleDecreaseQuantityFor36, handleIncreaseQuantityFor34, handleIncreaseQuantityFor36 } from "../../util/cart/computeCart"
import './style/cartreport.scss'
import './style/carttable.scss'
import { useEffect, useState } from "react"
import { fetchProducts } from "../../redux/actions/getProducts"
export const CartTable = ({
    itemImagesFor34,
    itemImagesFor36,
    dispatch,
}: {
    itemImagesFor34: Record<string, string>,
    itemImagesFor36: Record<string, string>,
    dispatch: AppDispatch,
}) => {
    const { products } = useSelector((state: RootState) => state.products)
    const { cart } = useSelector((state: RootState) => state.cart)

    const [listOfSize34, setListOfSize34] = useState(findListOfSize34(cart));
    const [listOfSize36, setListOfSize36] = useState(findListOfSize36(cart));


    const handleRemoveItem = (productId: string, isSize34: boolean, isSize36: boolean) => {
        dispatch(deleteCartItem(productId, isSize34, isSize36));
        setListOfSize34(prevList => prevList.filter(item => item.productId !== productId));
        setListOfSize36(prevList => prevList.filter(item => item.productId !== productId));
        window.location.reload()
    };
    useEffect(() => {
        if (!products) {
            dispatch(fetchProducts())
            console.log(products)
        }
    }, [])
    return (
        <div className="table_container">
            <table>
                <tbody>
                    {listOfSize34.map((item: CartProps, index: number) => (
                        <tr className='body_tr' key={index}>
                            <td className='cart_itemInformation'>
                                <div className='item_title'>
                                    {itemImagesFor34[item.productId] && <img src={itemImagesFor34[item.productId]} alt="" />}
                                    <div className='cart_itemInformation_text'>
                                        <h5>
                                            {item.title}
                                        </h5>
                                        <h6>
                                            Size
                                            {item.productSize[34] > 0 && <span>34</span>}
                                        </h6>
                                    </div>
                                </div>
                            </td>
                            {/* <div className='stock_container'> */}
                            <td className='quantity_box'>
                                <button
                                    className={`button ${item.productSize['34'] === 1 ? "disabledButton" : ""}`}
                                    disabled={item.productSize['34'] === 1}
                                    onClick={() => handleDecreaseQuantityFor34(item, dispatch)}>-
                                </button>
                                <span>{item.productSize['34']}</span>
                                <button
                                    disabled={item.productSize['34'] >= products?.find(product => product.id === item.productId)?.productSize['34']}
                                    onClick={() => handleIncreaseQuantityFor34(products, item, dispatch)}
                                    className={`button ${item.productSize['34'] >= products?.find(product => product.id === item.productId)?.productSize['34']
                                        ? "disabledButton"
                                        : ''
                                        }`}
                                >
                                    +
                                </button>
                            </td>
                            <td>
                                <button className='closeButton' onClick={() => handleRemoveItem(item.productId, true, false)}>Remove</button>
                            </td>
                            {/* </div> */}
                            {/* <div className='price_container'> */}
                            <td>{item.price * item.productSize['34']} €</td>
                            {/* </div> */}
                        </tr>
                    ))}
                    {listOfSize36.map((item: CartProps, index: number) => (
                        <tr className='body_tr' key={index}>
                            <td className='cart_itemInformation'>
                                <div className='item_title'>
                                    {itemImagesFor36[item.productId] && <img src={itemImagesFor36[item.productId]} alt="" />}
                                    <div className='cart_itemInformation_text'>
                                        <h5>
                                            {item.title}
                                        </h5>
                                        <h6>
                                            Size
                                            {item.productSize[36] > 0 && <span>36</span>}
                                        </h6>
                                    </div>
                                </div>
                            </td>
                            <td className='quantity_box'>
                                <button
                                    className={`button ${item.productSize['36'] === 1 ? "disabledButton" : ""}`}
                                    disabled={item.productSize['36'] === 1}
                                    onClick={() => handleDecreaseQuantityFor36(item, dispatch)}>-
                                </button>
                                <span>{item.productSize['36']}</span>
                                <button
                                    disabled={item.productSize['36'] >= products?.find(product => product.id === item.productId)?.productSize['36']}
                                    onClick={() => handleIncreaseQuantityFor36(products, item, dispatch)}
                                    className={`button ${item.productSize['36'] >= products?.find(product => product.id === item.productId)?.productSize['36']
                                        ? "disabledButton"
                                        : ''
                                        }`}
                                >
                                    +
                                </button>
                            </td>
                            <td>
                                <button className='closeButton' onClick={() => handleRemoveItem(item.productId, false, true)}>Remove</button>
                            </td>
                            {/* <div className='price_container'> */}
                            <td>{item.price * item.productSize['36']}€</td>
                            {/* </div> */}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}