import { Dispatch, SetStateAction } from "react";

// return class string
export const buttonCategoryHandle = (
  activeButton: string,
  buttonName: string
): string => {
  if (activeButton === buttonName) {
    return "";
  } else {
    return buttonName;
  }
};

export const handleButtonClick = (
  buttonName: string,
  activeButton: string,
  setActiveButton: Dispatch<SetStateAction<string>>
) => {
  const updatedButtonState = buttonCategoryHandle(activeButton, buttonName);
  setActiveButton(updatedButtonState);
};
