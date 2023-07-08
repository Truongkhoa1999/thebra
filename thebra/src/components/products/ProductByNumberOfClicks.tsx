import { ProductProps } from "../../type/ProductProps";
import { truncateTitle } from "../../util/truncate/truncateTitle";
import "./style/ProductByNumberOfClicks.scss";
interface ProductByNumberOfClicksProps{
  products:ProductProps[];
}
export const ProductByNumberOfClicks:React.FC<ProductByNumberOfClicksProps> = ({products}) => {
  const firstthreeproducts = products.slice(0, 6);
  return (
    <div className="productbynumberofclicks_container">
      <h1>Best seller</h1>
      <div className="bestseller_cards">
        {firstthreeproducts.map((p) => (
          <div className="bestseller_card" key={p.id}>
            <img src={p.images[0]} alt="thumbnail images" />
            <h2>{truncateTitle(p.title)}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
