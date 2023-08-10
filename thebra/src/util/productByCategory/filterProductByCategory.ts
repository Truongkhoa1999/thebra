import { ProductProps } from "../../type/ProductProps";

export const filterProductByCategory = (products: ProductProps[], category: string) => {
    if (!category) {
        return products.slice(0,3)
    } else {
        const filteredProducts = products.filter(p => p.category === category)
        return filteredProducts.slice(0,3)
    }
}
export const detectRelevantItemsByCategory = (category: string , products: ProductProps[]) => {
    if (category) {
      const relevantProducts = filterProductByCategory(products, category);
      return relevantProducts;
    } else{
        return products; // Return an empty array as the default case

    }
  };