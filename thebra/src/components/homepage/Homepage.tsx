// lib and materials
import "./style/Homepage.scss";

// components
import AppBar from "../appbar/AppBar";
import Carousel from "../carousel/Carousel";
import Products from "../products/Products";
import { Footer } from "../footer/Footer";

const Homepage = () => {
  return (
    <div className="home_container">
      <AppBar />
      <Carousel />
      <Products />
      <Footer />
    </div>
  );
};
export default Homepage;
