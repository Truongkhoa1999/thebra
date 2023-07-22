import { CarouselData } from "../../data/CarouselData";

export const renderCountGroups = (arrayIndex: number) => {
  return CarouselData.map((_, index) => (
    <li className={`count ${index === arrayIndex ? "count_active" : ""}`} key={index}></li>
  ));
};
