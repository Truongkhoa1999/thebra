import React, { useEffect, useState } from "react";
import {
  fetchOrderItemsListByOrderId,
  fetchOrderItemsProduct,
} from "../../util/fetchOrderItemsFromBackend/fetchOrderItemsByOrderId";
import { OrderItemsProps } from "../../redux/actions/cart";

export const CartImageItems = () => {
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const [listOfProductId, setListOfProductId] = useState<string[]>([]);
  const [orderItemList, setOrderItemList] = useState<OrderItemsProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (orderId) {
          // Fetch the product IDs
          const response = await fetchOrderItemsProduct(orderId);
          const productListId = response.map((i) => i);
          setListOfProductId(productListId);

          // Fetch the order items
          const orderItemsResponse = await fetchOrderItemsListByOrderId(orderId);
          if (orderItemsResponse) {
            setOrderItemList(orderItemsResponse);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [orderId]);

  // Ensure that rendering corresponds linearly
  const renderItems = () => {
    const result = [];
    for (let i = 0; i < listOfProductId.length; i++) {
      const imageUrl = listOfProductId[i];
      const orderItem = orderItemList[i];

      if (imageUrl && orderItem) {
        result.push(
          <div className="image_container" key={i}>
            <img src={imageUrl} alt="customers' items images" />
            <div className="orderInfo">
              <p>Quantity: {orderItem.quantity}</p>
              <p>Size: {orderItem.size}</p>
            </div>
          </div>
        );
      }
    }
    return result;
  };

  return (
    <div className="cartImages">
      <div className="images">{renderItems()}</div>
    </div>
  );
};
