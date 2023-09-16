// Lib and material
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.scss";
import "./style.scss";
// Components
import Homepage from "./sites/homepage/Homepage";
import { ProductDetails } from "./sites/productDetails/ProductDetails";
import { SignIn } from "./sites/signin/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { Signup } from "./sites/signup/Signup";
import { useEffect } from "react";
import { fetchProducts } from "./redux/actions/getProducts";
import { Cart } from "./sites/cart/Cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Products from "./sites/products/Products";
import Preloader from "./components/loader/Preloader";
import { Payments } from "./sites/payment/Payments";
import { MyOrders } from "./sites/myorders/MyOrders";
import { Contact } from "./sites/contact/Contact";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const stripePromise = loadStripe(
    "pk_live_51NWsLeKEPicYF8bFJMAFuEdhspcw9XwQa6Cr11Teo7OLVJJi2sFwkfV3Fb40uwTtRumOv2IRZiIAyaJgKUmZcUf600o4Y3QZiH"
  );
  // const stripePromise = loadStripe('pk_test_51NWsLeKEPicYF8bFJDh3qQrRuRi61NgIGgzcm2C2aE1p6P8THLoqQYDH1VP0Kccl7BVdz8Pc77Fz9Z2R6riDlAjS00UT89BzRl');

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route
          path="/product/:id"
          element={<ProductDetails products={products} />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/:orderId" element={<Cart />} />
        <Route path="/myOrders" element={<MyOrders />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/preloader" element={<Preloader />} />
        <Route
          path="/payments"
          element={
            <Elements stripe={stripePromise}>
              <Payments />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
