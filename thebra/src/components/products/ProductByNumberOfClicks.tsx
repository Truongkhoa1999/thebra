import { ProductsData } from "../../data/ProductsData";
import "./style/ProductByNumberOfClicks.scss";
export const ProductByNumberOfClicks = () => {
  const firstthreeproducts = ProductsData.slice(0, 6);
  return (
    <div className="productbynumberofclicks_container">
      <h1>Best seller</h1>
      <div className="bestseller_cards">
        {firstthreeproducts.map((p) => (
          <div className="bestseller_card">
            <img src="https://image.clovia.com/media/clovia-images/images/720x1080/clovia-picture-cotton-rich-padded-non-wired-spacer-cup-t-shirt-bra-1-413186.jpg" />
            <h2>{p.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
