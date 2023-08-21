// Lib and material
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.scss'
import './style.scss'
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
import { Payment } from "./sites/payment/Payment";
import Products from "./sites/products/Products";
import Preloader from "./components/loader/Preloader";
import { Payments } from "./sites/payment/Payments";

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const stripePromise = loadStripe('pk_live_51NWsLeKEPicYF8bFJMAFuEdhspcw9XwQa6Cr11Teo7OLVJJi2sFwkfV3Fb40uwTtRumOv2IRZiIAyaJgKUmZcUf600o4Y3QZiH');

  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetails products={products} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/products/:category' element={<Products />} />
        <Route path='/preloader' element={<Preloader />} />
        <Route
          path="/payment"
          element={<Elements stripe={stripePromise}><Payment /></Elements>}
        />
           <Route
          path="/payments"
          element={<Elements stripe={stripePromise}><Payments /></Elements>}
        />
        {/* <Route
          path="/payment?orderId=:orderId"
          element={<Elements stripe={stripePromise}><Payment /></Elements>}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
