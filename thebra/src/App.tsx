// Lib and material
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.scss'
// Components
import Homepage from "./sites/homepage/Homepage";
import { ProductDetails } from "./sites/productDetails/ProductDetails";
import { SignIn } from "./sites/signin/SignIn";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { Signup } from "./sites/signup/Signup";
import { useEffect } from "react";
import { fetchProducts } from "./redux/actions/getProducts";
import { Cart } from "./sites/cart/Cart";

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  return (
      <Router>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetails products={products} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </Router>
  );
}

export default App;
