import { Link } from "react-router-dom";
import "./style/ProductByCategories.scss";

// hooks
import { useEffect, useState } from "react";
import { handleButtonClick } from "../../util/categorybuttons/buttonfunction";
import { filterProductByCategory } from "../../util/productByCategory/filterProductByCategory";
import { ProductProps } from "../../type/ProductProps";

interface ProductByCategoriesProps {
  products: ProductProps[];
}
const ProductByCategories: React.FC<ProductByCategoriesProps> = ({ products }) => {
  const [activeButton, setActiveButton] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(products.slice(0, 3))
  useEffect(() => {
    setFilteredProducts(products);
  }, []);
  return (
    <div className="post_container">
      <div className="heading_container">
        <div className="logo" />
        <h1 className="collection_title">Explore our collection</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut esse
          eveniet quas odio corrupti at saepe ea repellat veritatis voluptate
        </p>
      </div>
      <div className="button_container">
        <button
          onClick={() => {
            handleButtonClick("red", activeButton, setActiveButton)
            setFilteredProducts(filterProductByCategory(products, "BRALETTE"))
          }
          }
          className={
            activeButton === "red"
              ? "button-red button-red--active"
              : "button-red"
          }
        >
          Bralette
        </button>
        <button
          onClick={() => {
            handleButtonClick("green", activeButton, setActiveButton)
            setFilteredProducts(filterProductByCategory(products, "COTTON-LINEN"))
          }
          }
          className={
            activeButton === "green"
              ? "button-green button-green--active"
              : "button-green"
          }
        >
          Cotton-linen
        </button>
        <button
          onClick={() => {
            handleButtonClick("blue", activeButton, setActiveButton)
            setFilteredProducts(filterProductByCategory(products, "PUSH-UP")
            )

          }
          }
          className={
            activeButton === "blue"
              ? "button-blue button-blue--active"
              : "button-blue"
          }
        >
          Push-up
        </button>
      </div>
      <div className="item_container">
        {filteredProducts.map((p) => (
          <Link to={`/product/${p.id}`} className="item link" key={p.id}>
            <img src={p.images[2]} alt="thumbnail images" />
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
