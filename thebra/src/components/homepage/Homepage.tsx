// lib and materials
import "./style/Homepage.scss";

// components
import AppBar from "../appbar/AppBar";
import Carousel from "../carousel/Carousel";

const Homepage = () => {
  return (
    <div className="home_container">
      <AppBar />
      <Carousel />
    </div>
  );
};
export default Homepage;
