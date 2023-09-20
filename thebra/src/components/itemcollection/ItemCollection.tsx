import { Link } from "react-router-dom";
import "./style/itemcollection.scss";
import { useEffect, useState } from "react";

export const ItemCollection = () => {
  const [category, setCategory] = useState("");
  function handleChangeCategory(newCategory: string): void {
    setCategory(newCategory);
  }
  useEffect(() => {
    handleChangeCategory;
  }, [category]);

  return (
    <div className="itemCollection-container">
      <h2>Bras or Panties</h2>
      <div>
        <Link className="img_container " to={`/products/${category}`}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/Background%2Fupper.avif?alt=media&token=5da6b34d-0d57-4375-95c8-5cd1f3b73712"
            alt="1"
            onClick={() => handleChangeCategory("BRA")} // Pass a function
          />
        </Link>
        <Link className="img_container R" to={`/products/${category}`}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/Background%2Flower.avif?alt=media&token=11e88337-011a-49b5-afde-080c77e2b828"
            alt="2"
            onClick={() => handleChangeCategory("PANTY")} // Pass a function
          />
        </Link>
      </div>
    </div>
  );
};
