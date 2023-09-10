import { useEffect, useState } from "react";
import { fetchOrderItemsFromBackend } from "../../util/fetchOrderItemsFromBackend/fetchOrderItemsByOrderId";
import "./style/popupshopping.scss";
interface PendingOrderData {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  size: string;
}
export const PopupShopping = ({ orderId }: { orderId: string }) => {
  const [pendingOrderData, setPendingOrderData] = useState<PendingOrderData[]>(
    []
  );
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderItems = await fetchOrderItemsFromBackend(orderId);
        setPendingOrderData(orderItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderData();
  }, [orderId]);
  return (
    <div className="popup_container">
      {isVisible ? (
        <div>
          <button onClick={() => setIsVisible(!isVisible)}>X</button>
          {pendingOrderData.map((o, i) => (
            <p key={i}>{o.orderId}</p>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
