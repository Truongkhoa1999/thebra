import { ProductProps } from "../../type/ProductProps";

export const filterProductByCategory = (
  products: ProductProps[],
  category: string
) => {
  if (!category) {
    return products.slice(0, 3);
  } else {
    const filteredProducts = products.filter((p) => p.category === category);
    return filteredProducts.slice(0, 3);
  }
};
export const detectRelevantItemsByCategory = (
  category: string,
  products: ProductProps[]
) => {
  if (category) {
    const relevantProducts = products.filter(
      (p) => p.category.toLocaleLowerCase() === category.toLocaleLowerCase()
    );
    console.log(relevantProducts);
    return relevantProducts;
  } else {
    return products;
  }
};

export const detectIfPantyOrBra = (productById: ProductProps) => {
  if (productById.category === "BRA" || productById.category === "PANTY") {
    return true;
  }
  return false;
};
