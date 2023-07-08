import { useSelector } from "react-redux";
import { ProductProps } from "../../type/ProductProps";
import { useEffect, useState } from "react";
import { detectRelevantItems } from "../../util/productByCategory/filterProductByCategory";
import { RootState } from "../../redux/store";
import "./style/ProductDetails.scss";


export const RelevantProducts = ({products}:{products:ProductProps[]}) => {
    const { productById } = useSelector((state: RootState) => state.productById)
    const [relevantProducts, setRelevantProducts] = useState<ProductProps[]>(products)
    useEffect(() => {
      if(products) {       const relevantItems = detectRelevantItems(productById, products);
        setRelevantProducts(relevantItems);
      console.log(products)
      } else{
      setRelevantProducts(products)
      }
 
      }, []);
    return (
        <div className="relevant_container">
        <h1>You may like</h1>
        <div className="items">
          {
            relevantProducts?.map(p => (
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