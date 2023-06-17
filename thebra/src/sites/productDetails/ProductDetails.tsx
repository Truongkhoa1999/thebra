// materials
import "./style/ProductDetails.scss";

// Components
import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import { ProductInformation } from "../../components/products/ProductInformation";
import ProductCard from "../../components/products/ProductCard";

export const ProductDetails = () => {
  return (
    <div className="productDetails_container">
      <AppBar />
      <ProductInformation />
      <div className="relevant_container">
        <h1>You may like</h1>
        <div className="items">
          <ProductCard className="item" />
          <ProductCard className="item" />
          <ProductCard className="item" />
          <ProductCard className="item" />
        </div>
      </div>

      <Footer />
    </div>
  );
};
