import { Link } from "react-router-dom";
import { ProductProps } from "../../type/ProductProps";
import "./style/ProductByNumberOfClicks.scss";
import { useEffect, useState } from "react";
interface ProductByNumberOfClicksProps {
  products: ProductProps[];
}
export const ProductByNumberOfClicks: React.FC<
  ProductByNumberOfClicksProps
> = ({ products }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<ProductProps[]>([]);
  useEffect(() => {
    if (products) {
      setIsLoading(true);
    }
    if (products && products.length > 0) {
      const firstthreeproducts = products.slice(0, 3);
      setFilteredData(firstthreeproducts);
      setIsLoading(false);
    }
  }, [products]);

  return (
    <div className="productbynumberofclicks_container">
      <h1>BEST SELLER</h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="bestseller_cards">
          {filteredData.map((p) => (
            <div className="bestseller_card" key={p.id}>
              <Link to={`/product/${p.id}`} className="itemlink" key={p.id}>
                <img src={p.images[0]} alt="thumbnail images" />
                <div className="information">
                  <h5>{p.title}</h5>
                  <h4>{p.price}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
