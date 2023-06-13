import { Link } from "react-router-dom";
import { ProductsData } from "../../data/ProductsData";
import "./style/ProductByCategories.scss";
// hooks
import { useState } from "react";
import { buttonCategoryHandle } from "../../util/buttonfunction";

const ProductByCategories = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName: string) => {
    const updatedButtonState = buttonCategoryHandle(activeButton, buttonName);
    setActiveButton(updatedButtonState);
  };

  return (
    <div className="post_container">
      <div className="button_container">
        <button
          onClick={() => handleButtonClick("red")}
          className={
            activeButton === "red"
              ? "button-red button-red--active"
              : "button-red"
          }
        >
          Red
        </button>
        <button
          onClick={() => handleButtonClick("green")}
          className={
            activeButton === "green"
              ? "button-green button-green--active"
              : "button-green"
          }
        >
          Green
        </button>
        <button
          onClick={() => handleButtonClick("blue")}
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
        {ProductsData.map((p) => (
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
      </div>
    </div>
  );
};

export default ProductByCategories;
