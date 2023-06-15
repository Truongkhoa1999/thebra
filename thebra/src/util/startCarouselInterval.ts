import { useEffect, Dispatch, SetStateAction } from "react";
import { CarouselData } from "../data/CarouselData";

export const startCarouselInterval = (
  setArrayIndex: Dispatch<SetStateAction<number>>,
  isDelayed: boolean
): void => {
  useEffect(() => {
    let interval: number;
    if (!isDelayed) {
      interval = setInterval(() => {
        setArrayIndex((prevIndex) => (prevIndex + 1) % 5);
      }, 2000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [setArrayIndex, isDelayed]);
};

export const updateArrayIndex = (
  increment: number,
  arrayIndex: number,
  setArrayIndex: Dispatch<SetStateAction<number>>,
  setIsDelayed: Dispatch<SetStateAction<boolean>>
): void => {
  const newIndex = arrayIndex + increment;
  if (newIndex >= 0 && newIndex < CarouselData.length) {
    setArrayIndex(newIndex);
  } else if (newIndex < 0) {
    setArrayIndex(CarouselData.length - 1);
  } else {
    setArrayIndex(0);
  }
  setIsDelayed(true);
  setTimeout(() => {
    setIsDelayed(false); // Reset delay flag after 3 seconds
  }, 4000);
};
