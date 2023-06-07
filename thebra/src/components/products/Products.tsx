// lib and material
import { ProductsData } from "../../data/ProductsData";
import "./style/Products.scss";

const Products = () => {
  return (
    <div className="post_container">
      <div className="button_container">
        <button>Red</button>
        <button>Grren</button>
        <button>Blue</button>
      </div>
      <div className="item_container">
        {ProductsData.map((p) => (
          <div className="item" key={p.id}>
            <img src={p.thumbnail} alt=" " />
            <div className="descrip">
            <h2>{p.title}</h2>
            <h3>{p.price} €</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
