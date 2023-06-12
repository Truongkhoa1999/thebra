// return class string
export const buttonCategoryHandle = (activeButton: string, buttonName: string): string => {
  if (activeButton === buttonName) {
    return "";
  } else {
    return buttonName;
  }
};
