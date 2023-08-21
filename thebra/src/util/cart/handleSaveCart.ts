import { addItemToCart, saveCart } from "../../redux/actions/cart"
import { CartProps } from "../../type/CartProps"
import { ProductProps } from "../../type/ProductProps"
export const handleSaveCart = async (dispatch: any, productById: ProductProps, cart: CartProps[], is34: boolean, is36: boolean) => {
  const newItem: CartProps = {
    cartId: productById?.id ?? '',
    title: productById?.title ?? '',
    price: productById?.price ?? 0,
    productSize: {
      "34": is34 ? 1 : 0,
      "36": is36 ? 1 : 0
    },
    productId: productById?.id ?? '',
    images:[],
    map: undefined,
  }
  const existingItemIndex = cart.findIndex((item: CartProps) =>
    item.cartId === newItem.cartId &&
    ((is34 && item.productSize['34'] > 0) || (is36 && item.productSize['36'] > 0))
  )
  if (existingItemIndex !== -1) {
    const existingItem = cart[existingItemIndex];
    const updatedItem = {
      ...existingItem,
      productSize: {
        ...existingItem.productSize,
        "34": is34 ? existingItem.productSize['34'] + 1 : existingItem.productSize['34'],
        "36": is36 ? existingItem.productSize['36'] + 1 : existingItem.productSize['36'],
      }
    };
    const updatedCart = [...cart];
    updatedCart[existingItemIndex] = updatedItem;
    dispatch(saveCart(updatedCart));
  } else {
    dispatch(addItemToCart(newItem));
    dispatch(saveCart([...cart, newItem]));
  }
}
