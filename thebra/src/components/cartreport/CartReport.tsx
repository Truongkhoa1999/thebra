import './style/cartreport.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ProductProps } from '../../type/ProductProps'
import { cartTotal, findListOfSize34, findListOfSize36, handleDecreaseQuantityFor34, handleDecreaseQuantityFor36, handleIncreaseQuantityFor34, handleIncreaseQuantityFor36 } from '../../util/cart/computeCart'
import { CartProps } from '../../type/CartProps'
// import { truncateCartTitleLength } from '../../util/cart/cartTitle'
import { handleCartCheckout } from '../../util/cart/handleCartCheckout'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { deliveryFee } from '../../data/deliveryCost'
import { handleSwitchDeliveryType } from '../../util/cart/hanldeSwitchDeliveryType'
import { fetchItemImagesFor34, fetchItemImagesFor36 } from '../../util/getImageByProductId/getImageByProductId'
import { removeItem } from '../../util/cart/removeItem'
import { deleteCartItem, saveCart } from '../../redux/actions/cart'
import { CartTable } from './CartTable'
import { CartDeliveryMethod } from './CartDeliveryMethod'
import { CartHeadingForTable } from './CartHeadingForTable'
import { CartHeadingForDeliveryMethod } from './CartHeadingForDeliveryMethod'
// import { CartHeadingForDeliveryForm } from './CartHeadingForDeliveryForm'
import { detectIfOrderedItemIsZero } from '../../util/cart/detectIfOrderedItemIsZero'

export const CartReport = () => {
  const { cart } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()

  const listOfSize34 = findListOfSize34(cart)
  const listOfSize36 = findListOfSize36(cart)

  const [itemImagesFor34, setItemImagesFor34] = useState<Record<string, string>>({})
  const [itemImagesFor36, setItemImagesFor36] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchItemImagesFor34(listOfSize34, setItemImagesFor34)
    fetchItemImagesFor36(listOfSize36, setItemImagesFor36)
    detectIfOrderedItemIsZero(cart, dispatch);
    const updatedCart = detectIfOrderedItemIsZero(cart, dispatch); // Update local state with filtered cart
    dispatch(saveCart(updatedCart));

  }, []);



  return (
    <div className="cartreport_container">
      <CartHeadingForTable />
      <CartTable 
      itemImagesFor34={itemImagesFor34} 
      itemImagesFor36={itemImagesFor36} 
      dispatch={dispatch}
       />
      <CartHeadingForDeliveryMethod />
      <CartDeliveryMethod />
    </div>
  )
}

