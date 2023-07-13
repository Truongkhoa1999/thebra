import { ProductProps } from "../../type/ProductProps";

export const filterProductByCategory = (products: ProductProps[], category: string) => {
    if (!category) {
        return products.slice(0,3)
    } else {
        const filteredProducts = products.filter(p => p.category === category)
        return filteredProducts.slice(0,3)
    }
}
export const detectRelevantItems = (productById: ProductProps | null, products: ProductProps[]) => {
    const category = productById?.category;
    if (category) {
      const relevantProducts = filterProductByCategory(products, category);
      return relevantProducts;
    }
    return products; // Return an empty array as the default case
  };