// lib and materials
import "./style/Homepage.scss";

// components
import AppBar from "../../components/appbar/AppBar";
import Carousel from "../../components/carousel/Carousel";
import { Footer } from "../../components/footer/Footer";
import ProductByCategories from "../../components/products/ProductByCategories";
import { ProductByNumberOfClicks } from "../../components/products/ProductByNumberOfClicks";

const Homepage = () => {
  return (
    <div className="home_container">
      <AppBar />
      <Carousel />
      <ProductByCategories />
      <ProductByNumberOfClicks />
      <Footer />
    </div>
  );
};
export default Homepage;