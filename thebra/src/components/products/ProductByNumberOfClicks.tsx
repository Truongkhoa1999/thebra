import { Link } from "react-router-dom";
import { ProductProps } from "../../type/ProductProps";
// import { truncateTitle } from "../../util/truncate/truncateTitle";
import "./style/ProductByNumberOfClicks.scss";
interface ProductByNumberOfClicksProps {
  products: ProductProps[];
}
export const ProductByNumberOfClicks: React.FC<ProductByNumberOfClicksProps> = ({ products }) => {
  const firstthreeproducts = products.slice(0, 3);
  return (
    <div className="productbynumberofclicks_container">
      <h1>Best seller</h1>
      <div className="bestseller_cards">
        {firstthreeproducts.map((p) => (

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
    </div>
  );
};
