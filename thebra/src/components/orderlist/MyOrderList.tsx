import { useEffect, useState } from "react";
import { fetchOrderDataByUserId } from "../../util/order/fetchOrderData";
import { OrderProps } from "../../type/OrderProps";
// style
import "./style/myorderlist.scss";
import { PopupShopping } from "../popupShopping/PopupShopping";
export const MyOrderList = () => {
  const [orderPaidListData, setOrderPaidListDataListData] = useState<
    OrderProps[]
  >([]);
  const [orderPendingListData, setOrderPendingListDataListData] = useState<
    OrderProps[]
  >([]);

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isContinueShopping, setIsContinueShopping] = useState(true);
  const [orderId, setOrderId] = useState("");
  const handleContinueShopping = (orderId: string) => {
    setOrderId(orderId);
  };
  useEffect(() => {
    const fetchOrderData = async () => {
      const orderData = await fetchOrderDataByUserId();
      if (orderData) {
        const filterPaidData = orderData.filter(
          (p) => p.paymentStatus === "paid"
        );
        setOrderPaidListDataListData(filterPaidData);
        const filterPendingData = orderData.filter(
          (p) => p.paymentStatus === "pending"
        );
        setOrderPendingListDataListData(filterPendingData);
      }
    };
    fetchOrderData();
  }, []);

  const handleTrackButtonClick = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  return (
    <div className="orders">
      <div className="paidList">
        {orderPaidListData.map((order, i) => (
          <div className="order" key={i}>
            <div className="orderInfo">
              <div className="upper">
                <p>Payment status: {order.paymentStatus}</p>
                <p>Delivery Address: {order.shippingAddress}</p>
                <p>Total Price: {order.totalAmount}EUR</p>
              </div>
              <div className="buttons">
                <button onClick={() => handleTrackButtonClick(order.id)}>
                  Track
                </button>
              </div>
            </div>

            {expandedOrderId === order.id && (
              <div
                className={`expandedInformation ${
                  expandedOrderId === order.id ? "active" : ""
                }`}
              >
                <div className="state-container">
                  <h1 className="stateTitle">Order Tracking NO: {order.id}</h1>
                </div>
                <div className="posti">
                  <h3>Posti tracking page: https://www.posti.fi/en/tracking</h3>
                  <p>
                    Using Order Tracking NO in posti page to see further
                    information
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <div className="pendingList">
        {orderPendingListData.map((o, i) => (
          <div className="pendingOrder" key={i}>
            <div className="pendingOrderInfo">
              <div className="title">
                <p>{String(o.orderDate)}</p>
                <p>{o.paymentStatus}</p>
                <p>{o.totalAmount} €</p>
                <p>{o.shippingAddress}</p>
              </div>

              <button
                className="continue"
                onClick={() => {
                  handleContinueShopping(o.id);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        ))}
      </div> */}

      {/* {isContinueShopping ? <PopupShopping orderId={orderId} /> : ""} */}
    </div>
  );
};
