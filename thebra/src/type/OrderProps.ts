export type OrderProps = {
    "id": string,
    "totalAmount": number,
    "paymentStatus": string,
    "shippingAddress": string,
    "deliveryMethod": string,
    "orderDate": Date,
    "userId": string,
    "anonymousUserId": string,
    "anonymousUserGmail": string,
    "paymentRequestId": string,
    "country":  string
}
export type OrderItemsProps = {
    id: string;
    size: string;
    quantity: number;
    productId: string;
    orderId: string;
  };