// Types and util
import { ProductProps } from "../../type/ProductProps";
import { detectRelevantItemsByCategory } from "../../util/productByCategory/filterProductByCategory";
// Style
import "./style/RelevantProductById.scss";
// React redux
import { fetchProducts } from "../../redux/actions/getProducts";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../loader/Loader";

export const RelevantProductsByCategory = ({
  category,
}: {
  category: string;
}) => {
  const { products } = useSelector((state: RootState) => state.products);
  const [relevantProductsByCategory, setRelevantProductsByCategory] =
    useState<ProductProps[]>(products);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const location = window.location.pathname

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const relevantProducts = detectRelevantItemsByCategory(
        category,
        products
      );
      setRelevantProductsByCategory(relevantProducts);
      setIsLoading(false);
      console.log(location)
    }
  }, [category, products]);
  return (
    <div id="rc" className="relevant_container">
      {/* <h2 className="heading">{category.toUpperCase()}</h2> */}
      <h2 className="heading">{location.includes("products")? category.toUpperCase():
      "YOU MAY LIKE"}</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="relevant-items">
          {relevantProductsByCategory?.map((p) => (
            <Link
              style={{ textDecoration: "none" }}
              className="item"
              to={`/product/${p.id}`}
              key={p.id}
            >
              <img className="item-img" src={p.images[0]} />
              <div className="item-text">
                <h2>{p.title}</h2>
                <h2>{p.price}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
