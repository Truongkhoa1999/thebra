import { useSelector } from "react-redux";
import { ProductProps } from "../../type/ProductProps";
import { useEffect, useState } from "react";
import { detectRelevantItemsById } from "../../util/productByCategory/filterProductByCategory";
import { RootState } from "../../redux/store";


export const RelevantProductsById = ({ products }: { products: ProductProps[] }) => {
  const { productById } = useSelector((state: RootState) => state.productById)
  const [relevantProductsById, setRelevantProductsById] = useState<ProductProps[]>(products)
  useEffect(() => {
    if (products) {
      const relevantItems = detectRelevantItemsById(productById, products);
      setRelevantProductsById(relevantItems);
    } else {
      setRelevantProductsById(products)
    }
  }, []);
  return (
    <div className="relevant_container">
      <h3>You may like</h3>
      <div className="items">
        {
          relevantProductsById?.map(p => (
            <div className="item">
              <img src={p.images[2]}></img>
              <h2>{p.title}</h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}