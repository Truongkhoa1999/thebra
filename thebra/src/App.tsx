// Lib and material
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.scss'
// Components
import Homepage from "./sites/homepage/Homepage";
import { ProductDetails } from "./sites/productDetails/ProductDetails";
import { SignIn } from "./sites/signin/SignIn";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./redux/store";
import { Signup } from "./sites/signup/Signup";
import { useEffect } from "react";
import { fetchProducts } from "./redux/actions/getProducts";

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
        </Routes>
      </Router>
  );
}

export default App;
