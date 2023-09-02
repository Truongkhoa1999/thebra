import { useNavigate } from "react-router-dom";
import "./style/checkoutprogress.scss";
import { CheckoutProgressProps } from "../../type/CheckoutProgressProps";
import { checkIfCurrentPath } from "../../util/window/checkIfCurrentPath";

export const CheckOutProgress = ({ orderId }: CheckoutProgressProps) => {
  const navigate = useNavigate();
  const cartURL = checkIfCurrentPath("http://localhost:5173/cart");
  return (
    <div className="checkoutprogress_container">
      <button
        disabled={cartURL}
        onClick={() => navigate("/cart")}
        className="progress_button"
      >
        My Cart
      </button>
      <button
        disabled={orderId == null}
        onClick={() => navigate("./payments?orderId=${orderId}")}
        className="progress_button"
      >
        Payment
      </button>
    </div>
  );
};
