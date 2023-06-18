import { Link } from "react-router-dom";
import { ProductsData } from "../../data/ProductsData";
import "./style/ProductByCategories.scss";
// hooks
import { useState } from "react";
import { handleButtonClick } from "../../util/categorybuttons/buttonfunction";

const ProductByCategories = () => {
  const [activeButton, setActiveButton] = useState("");
  const first3Products = ProductsData.slice(0, 3);
  return (
    <div className="post_container">
      <h1 className="collection_title">Explore our collection</h1>
      <div className="button_container">
        <button
          onClick={() =>
            handleButtonClick("red", activeButton, setActiveButton)
          }
          className={
            activeButton === "red"
              ? "button-red button-red--active"
              : "button-red"
          }
        >
          Red
        </button>
        <button
          onClick={() =>
            handleButtonClick("green", activeButton, setActiveButton)
          }
          className={
            activeButton === "green"
              ? "button-green button-green--active"
              : "button-green"
          }
        >
          Green
        </button>
        <button
          onClick={() =>
            handleButtonClick("blue", activeButton, setActiveButton)
          }
          className={
            activeButton === "blue"
              ? "button-blue button-blue--active"
              : "button-blue"
          }
        >
          Blue
        </button>
      </div>
      <div className="item_container">
        {first3Products.map((p) => (
          <Link to="/productdetail" className="item link" key={p.id}>
            <img src={p.thumbnail} alt=" " />
            <div className="descrip">
              <div className="upper">
                <h2>{p.title}</h2>
                <h3>{p.price} €</h3>
              </div>
              <div className="lower">
                <p>{p.category}</p>
              </div>
            </div>
          </Link>
        ))}
        <div className="viewmore">
          <h4>view more-</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductByCategories;
