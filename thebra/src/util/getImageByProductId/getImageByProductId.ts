// import { AppDispatch } from "../../redux/store";

import { CartProps } from "../../type/CartProps";

export const getImageByProductId = async (productId: string) => {
    const response = await fetch(`https://thebrabe.onrender.com/api/v1/products/${productId}`)
    const productData = await response.json()
    return productData.images[0]
}
export const fetchItemImagesFor34 = async (listOfSize34:CartProps[],setItemImagesFor34:any ) => {
    const imageMap: Record<string, string> = {};

    for (const item of listOfSize34) {
      const image = await getImageByProductId(item.productId);
      imageMap[item.productId] = image;
    }

    setItemImagesFor34(imageMap);
  };
  export const fetchItemImagesFor36 = async (listOfSize36:CartProps[],setItemImagesFor36:any ) => {
    const imageMap: Record<string, string> = {};

    for (const item of listOfSize36) {
      const image = await getImageByProductId(item.productId);
      imageMap[item.productId] = image;
    }
    setItemImagesFor36(imageMap);
  };
  export const fetchItemImagesForFreesize = async (listOfSize36:CartProps[],setItemImagesForFreesize:any ) => {
    const imageMap: Record<string, string> = {};

    for (const item of listOfSize36) {
      const image = await getImageByProductId(item.productId);
      imageMap[item.productId] = image;
    }
    setItemImagesForFreesize(imageMap);
  };