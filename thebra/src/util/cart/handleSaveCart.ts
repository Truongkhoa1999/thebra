import { addItemToCart, increaseQuantity, saveCart } from "../../redux/actions/cart"
import { CartProps } from "../../type/CartProps"
import { ProductProps } from "../../type/ProductProps"

export const handleSaveCart = async (dispatch: any, productById: ProductProps, cart: CartProps[],is34:boolean, is36:boolean) => {
  const newItem: CartProps = {
    cartId: productById?.id ?? '',
    title: productById?.title ?? '',
    price: productById?.price ?? 0,
    productSize: {
      "34": is34 ? 1 : 0,
      "36": is36 ? 1 : 0
    },
    productId: productById?.id ?? '',
    map: undefined,
  }

  const existingItem = cart.find((item: CartProps) => item.cartId === newItem.cartId)

  if (existingItem) {
    dispatch(increaseQuantity(existingItem.productId))
  } else {
    newItem.productId = productById?.id ?? ''
    dispatch(addItemToCart(newItem))

  }
  const updatedCart = [...cart, newItem]
  dispatch(saveCart(updatedCart))

}