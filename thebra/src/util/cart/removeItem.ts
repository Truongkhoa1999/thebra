import { CartProps } from "../../type/CartProps";

export const removeItem = (inputProductId: string, inputProductSize: string, cart: CartProps[]) => {
    const itemIndex = cart.findIndex(i => i.productId === inputProductId && i.productSize.hasOwnProperty(inputProductSize))
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1)
    }
}