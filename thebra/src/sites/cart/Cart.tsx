import AppBar from "../../components/appbar/AppBar";
import { CartReport } from "../../components/cartreport/CartReport";
import "./style/cart.scss";
import "../../sites/productDetails/style/ProductDetails.scss";
import { Footer } from "../../components/footer/Footer";
import { CheckOutProgress } from "../../components/checkoutprogress/CheckOutProgress";
export const Cart = () => {
  return (
    <div className="cart_container">
      <AppBar />
      <CheckOutProgress />
      <CartReport />
      <Footer />
    </div>
  );
};
