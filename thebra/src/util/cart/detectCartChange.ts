import { CartProps } from "../../type/CartProps";

export const detectCartChanges = (
  previousCart: CartProps[],
  currentCart: CartProps[]
) => {
  if (previousCart.length !== currentCart.length) {
    return true; 
  }

  // Check if any individual item has changed
  for (let i = 0; i < currentCart.length; i++) {
    const previousItem = previousCart[i];
    const currentItem = currentCart[i];

    // Compare item properties for changes (you can define your own comparison logic)
    if (
      previousItem.cartId !== currentItem.cartId ||
      previousItem.title !== currentItem.title ||
      previousItem.price !== currentItem.price ||
      JSON.stringify(previousItem.productSize) !==
        JSON.stringify(currentItem.productSize)
    ) {
      return true; // Item has changed
    }
  }

  // No changes detected
  return false;
};
