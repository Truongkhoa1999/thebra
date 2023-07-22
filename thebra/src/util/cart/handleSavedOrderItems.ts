import { CartProps } from "../../type/CartProps";

export const handleSavedOrderItems = async (cart: CartProps[], orderId: string) => {
    const token = localStorage.getItem('jwt')
    const url = 'http://localhost:8080/api/v1/orderItems/'
    try {
        if (token) {
            const orderItemsArray = cart.map((item) => {
                const size = item.productSize['34'] ? '34' : '36';
                const quantity = item.productSize['34'] || item.productSize['36'] || 0;
                return {
                    quantity: quantity, // Use productSize to get the quantity for each size
                    size: size,
                    productId: item.productId,
                    orderId: orderId 
                };
            });
            // console.log(orderItemsArray) 
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderItemsArray)
            })
            if (response.status === 200) {
                console.log("Cart saved successfully.");
            } else {
                console.log("Failed to save the cart.");
            }
        }
    } catch (error) {
        console.log(error)
    }

}