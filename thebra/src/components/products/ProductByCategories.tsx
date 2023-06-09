// lib and material
import { Link } from "react-router-dom";
import { ProductsData } from "../../data/ProductsData";
import "./style/ProductByCategories.scss";

const ProductByCategories = () => {
  return (
    <div className="post_container">
      <div className="button_container">
        <button>Red</button>
        <button>Grren</button>
        <button>Blue</button>
      </div>
      <div className="item_container">
            {ProductsData.map((p) => (
                <Link to='/productdetail' className="item" key={p.id}>
                    <img src={p.thumbnail} alt=" " />
                    <div className="descrip">
                        <h2>{p.title}</h2>
                        <h3>{p.price} €</h3>
                    </div>
                </Link>
            ))}
        </div>    </div>
  );
};
export default ProductByCategories;
