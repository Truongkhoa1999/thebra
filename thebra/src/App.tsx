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

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const stripePromise = loadStripe('pk_test_51NWsLeKEPicYF8bFJDh3qQrRuRi61NgIGgzcm2C2aE1p6P8THLoqQYDH1VP0Kccl7BVdz8Pc77Fz9Z2R6riDlAjS00UT89BzRl');

  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetails products={products} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/products/:category' element={<Products />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
