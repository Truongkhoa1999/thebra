// import { saveCart } from "../../redux/actions/cart";
// import { AppDispatch } from "../../redux/store";
// import { CartProps } from "../../type/CartProps";

// export const detectIfOrderedItemIsZero = (cart: CartProps[], dispatch: AppDispatch) => {
//     const updatedCart = cart.filter(
//         p => p.productSize['36'] !== 0 || p.productSize['34'] !== 0 || p.productSize['Freesize'] !== 0
//     )
//     if (updatedCart) {
//         localStorage.removeItem('cart')
//         dispatch(saveCart(updatedCart))
//     }
//     return updatedCart
// }
import { saveCart } from "../../redux/actions/cart";
import { AppDispatch } from "../../redux/store";
import { CartProps } from "../../type/CartProps";

export const detectIfOrderedItemIsZero = (cart: CartProps[], dispatch: AppDispatch) => {
    const updatedCart = cart.filter(
        p => (
            (p.productSize['36'] !== undefined && p.productSize['36'] !== 0) ||
            (p.productSize['34'] !== undefined && p.productSize['34'] !== 0) ||
            (p.productSize['Freesize'] !== undefined && p.productSize['Freesize'] !== 0)
        )
    );

    localStorage.removeItem('cart');
    dispatch(saveCart(updatedCart));

    return updatedCart;
}
