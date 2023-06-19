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
            <img src="https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$ed$&n=ell_7008974-04_Ff_M0085725&mw=1500&fmt=webp" />
            <h2>{p.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
