// Lib and material
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Homepage from "./sites/homepage/Homepage";
import { ProductDetails } from "./sites/homepage/productDetails/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/productdetail" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
