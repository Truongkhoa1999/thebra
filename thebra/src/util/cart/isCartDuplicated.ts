import { CartProps } from "../../type/CartProps";
import fetchExistingOrders from "./fetchExistingOrders";

export const isCartDuplicated = async (cart: CartProps[]): Promise<boolean> => {
    const existingOrders = await fetchExistingOrders();
    const cartItemsString = cart.map((item) => JSON.stringify(item));
    for (const order of existingOrders) {
        if (order.status !== "paid") {
            const orderItemsString = order.orderItems.map((item: any) => JSON.stringify(item));
            const allItemsExist = cartItemsString.every((item) => orderItemsString.includes(item));

            if (allItemsExist) {
                return true;
            }
        }

    }
    return false;
};
