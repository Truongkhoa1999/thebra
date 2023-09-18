import { Link, useNavigate } from "react-router-dom";
import "./style/ProductByCategories.scss";

// hooks
import { useEffect, useState } from "react";
import { handleButtonClick } from "../../util/categorybuttons/buttonfunction";
import { filterProductByCategory } from "../../util/productByCategory/filterProductByCategory";
import { ProductProps } from "../../type/ProductProps";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProducts } from "../../redux/actions/getProducts";

const ProductByCategories = () => {
  const [activeButton, setActiveButton] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(
    products.slice(0, 3)
  );
  const [category, setCategory] = useState("Bralette");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsIfNeeded = async () => {
      try {
        const fetchedProducts = await dispatch(fetchProducts());
        if (fetchedProducts) {
          setFilteredProducts(fetchedProducts.slice(0, 3));
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    if (products.length === 0 || location.pathname.includes("/homepage")) {
      fetchProductsIfNeeded();
    }
  }, [dispatch, products, location.pathname]);

  return (
    <div className="post_container" id="posts">
      <div className="button_container">
        <button
          onClick={() => {
            handleButtonClick("red", activeButton, setActiveButton);
            setFilteredProducts(filterProductByCategory(products, "BRALETTE"));
            setCategory("Bralette");
          }}
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
            handleButtonClick("green", activeButton, setActiveButton);
            setFilteredProducts(
              filterProductByCategory(products, "COTTON-LINEN")
            );
            setCategory("Cotton-linen");
          }}
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
            handleButtonClick("blue", activeButton, setActiveButton);
            setFilteredProducts(filterProductByCategory(products, "PUSH-UP"));
            setCategory("Push-up");
          }}
          className={
            activeButton === "blue"
              ? "button-blue button-blue--active"
              : "button-blue"
          }
        >
          Push-up
        </button>
      </div>
      {isLoading ? (
        // <p className="loading-text">Loading...</p>
        <div className="loader"></div>
      ) : (
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
            <button
              onClick={() => {
                navigate(`/products/${category}`);
              }}
            >
              VIEW MORE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductByCategories;
