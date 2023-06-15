// lib and material
import "./style/Carousel.scss";
import { CarouselData } from "../../data/CarouselData";
import { useState } from "react";
import {
  startCarouselInterval,
  updateArrayIndex,
} from "../../util/startCarouselInterval";
const Carousel = () => {
  const [arrayIndex, setArrayIndex] = useState(0);
  const [isDelayed, setIsDelayed] = useState(false);
  startCarouselInterval(setArrayIndex,isDelayed);

  return (
    <div className="carousel_container">
      <div className="products_container">
        <button
          className="arrow_button"
          onClick={() => updateArrayIndex(-1, arrayIndex, setArrayIndex,setIsDelayed)}
        >
          {"<"}
        </button>
        <img src={CarouselData[arrayIndex]} alt="1" />
        <button
          className="arrow_button"
          onClick={() => updateArrayIndex(+1, arrayIndex, setArrayIndex,setIsDelayed)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
export default Carousel;
