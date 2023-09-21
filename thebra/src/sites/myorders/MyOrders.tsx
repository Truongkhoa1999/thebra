import { useEffect, useState } from "react";
import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import { MyOrderList } from "../../components/orderlist/MyOrderList";
import { isUserSignedIn } from "../../util/checkingSigninStatus/isUserSignedIn";
// Style
import "./style/myorders.scss";
import { Loader } from "../../components/loader/Loader";

export const MyOrders = () => {
  const [isSignedInYet, setIsSignedInYet] = useState(true);
  useEffect(() => {
    const isSignedInYet = isUserSignedIn();
    if (isSignedInYet) {
      setIsSignedInYet(!isSignedInYet);
    }
  }, []);
  return (
    <div className="myoders_container">
      <AppBar />
      <h1 className="pageTitle">My Orders</h1>
      {isSignedInYet ? (
        <div className="noti-container">
          <p className="notification">Please Sign in to view your orders</p>
          <Loader />
        </div>
      ) : (
        ""
      )}
      <MyOrderList />
      <Footer />
    </div>
  );
};
