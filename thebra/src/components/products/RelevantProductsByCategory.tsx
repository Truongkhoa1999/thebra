import { useDispatch, useSelector } from "react-redux";
import { ProductProps } from "../../type/ProductProps";
import { useEffect, useState } from "react";
import { detectRelevantItemsByCategory } from "../../util/productByCategory/filterProductByCategory";
import { AppDispatch, RootState } from "../../redux/store";
import "./style/RelevantProductById.scss";
import { fetchProducts } from "../../redux/actions/getProducts";
import { Link } from "react-router-dom";

export const RelevantProductsByCategory = ({
  category,
}: {
  category: string;
}) => {
  const { products } = useSelector((state: RootState) => state.products);
  const [relevantProductsByCategory, setRelevantProductsByCategory] =
    useState<ProductProps[]>(products);
  const dispatch = useDispatch<AppDispatch>();

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
    }
  }, [category, products]);
  return (
    <div className="relevant_container">
      <h2 className="heading">{category}</h2>
      <div className="relevant-items">
        {relevantProductsByCategory?.map((p) => (
          <Link style={{textDecoration:"none"}} className="item" to={`/product/${p.id}`} key={p.id}>
            <img className="item-img" src={p.images[0]} />
            <div className="item-text">
              <h2 >{p.title}</h2>
              <h2>{p.price}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
