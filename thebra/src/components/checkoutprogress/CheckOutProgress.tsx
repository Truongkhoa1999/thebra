import { useNavigate } from "react-router-dom";
import "./style/checkoutprogress.scss";
import {
  checkIfCurrentPath,
  checkIfOrderIdNull,
} from "../../util/window/checkIfCurrentPath";

export const CheckOutProgress = () => {
  const navigate = useNavigate();
  const isCartURL = checkIfCurrentPath("/cart");
  const isPaymentUrl = checkIfCurrentPath("/payments");
  const isOrderIdNull = checkIfOrderIdNull();
  const orderId = localStorage.getItem("orderId")
  return (
    <div className="checkoutprogress_container">
      <button
        disabled={isOrderIdNull}
        onClick={() => navigate("/cart")}
        className={`${
          isCartURL ? "progress_button-active" : "progress_button"
        }`}
      >
        My Cart
      </button>
      <button
        disabled={isOrderIdNull}
        onClick={() => navigate(`/payments?orderId=${orderId}`)}
        className={`${
          isPaymentUrl ? "progress_button-active" : "progress_button"
        }`}
      >
        Payment
      </button>
    </div>
  );
};
