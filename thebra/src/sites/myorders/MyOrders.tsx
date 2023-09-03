import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import { MyOrderList } from "../../components/orderlist/MyOrderList";

export const MyOrders = () => {
  return (
    <div className="myoders_container">
      <AppBar />
      <MyOrderList />
      <Footer /> 
    </div>
  );
};
