import { CartProps } from "../../type/CartProps"



export const computeCartPriceForSize34 = (cart:CartProps[]) => {
    const totalCartPrice = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.productSize[0];
    },0)
    return totalCartPrice;

}
export const computeCartPriceForSize36 = (cart:CartProps[]) => {
    const totalCartPrice = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.productSize[1];
    },0)
    return totalCartPrice;

}