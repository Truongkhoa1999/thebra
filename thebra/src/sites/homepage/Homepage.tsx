// lib and materials
import "./style/Homepage.scss";

// components
import AppBar from "../../components/appbar/AppBar";
import Carousel from "../../components/carousel/Carousel";
import { Footer } from "../../components/footer/Footer";
import ProductByCategories from "../../components/products/ProductByCategories";
import { ProductByNumberOfClicks } from "../../components/products/ProductByNumberOfClicks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProducts } from "../../redux/actions/getProducts";
import { useEffect, useState } from "react";
import { smoothScroll } from "../../util/window/smoothScroll";

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts());
    if (window.location.hash === '#posts') {
      smoothScroll('posts', true)
    }
  }, [dispatch]);
  return (
    <div className="home_container">
      <AppBar />
      <Carousel key="carousel1" />
      <ProductByCategories />
      <ProductByNumberOfClicks products={products} />
      <Footer />
    </div>
  );
};
export default Homepage;
