import { CartProps } from "../../type/CartProps";

export const handleSavedOrderItems = async (cart: CartProps[], orderId: string) => {
  const token = localStorage.getItem('jwt');
  const url = 'http://localhost:8080/api/v1/orderItems/';
  try {
    if (token) {
      // const orderItemsArray = cart.map((item) => {
      //   const size = item.productSize['34'] ? '34' : '36';
      //   const quantity = item.productSize['34'] || item.productSize['36'] || 0;
      //   return {
      //     quantity: quantity,
      //     size: size,
      //     productId: item.productId,
      //     orderId: orderId,
      //   };
      // });
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderItemsArray), // Send all order items in a single request
      });

      if (response.status === 200) {
        console.log("Cart saved successfully.");
      } else {
        console.log("Failed to save the cart.");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
