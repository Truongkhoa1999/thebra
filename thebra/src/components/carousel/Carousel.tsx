// lib and material
import "./style/Carousel.scss";
import { CarouselData } from "../../data/CarouselData";
import { useState } from "react";
import {
  startCarouselInterval,
  swipeHandlers,
  updateArrayIndex,
} from "../../util/carousel/startCarouselInterval";
import { renderCountGroups } from "./RenderCountGroup";

const Carousel = () => {
  const [arrayIndex, setArrayIndex] = useState(0);
  const [isDelayed, setIsDelayed] = useState(false);
  startCarouselInterval(setArrayIndex, isDelayed);

  return (
    <div className="carousel_container">
      <div
        className="products_container"
        {...swipeHandlers(arrayIndex, setArrayIndex, setIsDelayed)}
      >
        <button
          className="arrow_button L"
          onClick={() =>
            updateArrayIndex(-1, arrayIndex, setArrayIndex, setIsDelayed)
          }
        >
          {"<"}
        </button>
        <img src={CarouselData[arrayIndex]} alt="1" key={arrayIndex} />
        <button
          className="arrow_button R"
          onClick={() =>
            updateArrayIndex(+1, arrayIndex, setArrayIndex, setIsDelayed)
          }
        >
          {">"}
        </button>
      </div>
      <div className="count_groups">{renderCountGroups(arrayIndex)}</div>
    </div>
  );
};
export default Carousel;
