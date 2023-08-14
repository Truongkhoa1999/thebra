import { CartProps } from "../../type/CartProps";

export const handleSavedOrderItemsForNonUser = async (cart: CartProps[], orderId: string) => {
  const url = 'https://thebrabe.onrender.com/api/v1/orderItems/ForNonUser';
  try {
      const orderItemsArray = []
      for (const item of cart) {
        const productId = item.productId
        for (const size in item.productSize){
          const quantity = item.productSize[size]
          orderItemsArray.push({
            quantity:quantity,
            size:size,
            productId:productId,
            orderId:orderId
          })
        }
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify(orderItemsArray),
      });

      if (response.status === 200) {
        console.log("Cart saved successfully.");
      } else {
        console.log("Failed to save the cart.");
      }
    
  } catch (error) {
    console.log(error);
  }
};
