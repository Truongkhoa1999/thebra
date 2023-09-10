import { v4 as uuidv4 } from "uuid";
import { OrderItemProps, OrderItemsProps } from "../../redux/actions/cart";
export const fetchOrderItemsProduct = async (
  id: ReturnType<typeof uuidv4>
): Promise<string[]> => {
  const URL = `https://thebrabe.onrender.com/api/v1/products/orderItems/${id}`;
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch order items");
    }
    const orderItems: string[] = await response.json();
    // const uniqueOrderItems = [...new Set(orderItems)]
    return orderItems;
  } catch (error) {
    throw error;
  }
};

export const fetchOrderItemsListByOrderId  = async (orderId:ReturnType<typeof uuidv4>)=> {
  const URL = `https://thebrabe.onrender.com/api/v1/orderItems/${orderId}`
  try{
    const response = await fetch (URL,{
      method:"GET",
      headers:{
        "Content-type":"application/json"
      }
    })
    if (!response.ok){
      throw new Error("Erorr fetching")
    }
    const orderItemsList:OrderItemsProps[] = await response.json()
    console.log(orderItemsList)
    return orderItemsList
  } catch (error){
    console.log(error)
  }
}
