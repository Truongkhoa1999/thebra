// materials
import "./style/ProductDetails.scss";

// Components
import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import { ProductInformation } from "../../components/products/ProductInformation";
import { ProductProps } from "../../type/ProductProps";
import { RelevantProducts } from "./RelevantProducts";

interface ProductDetailProps  {
  products: ProductProps[];
}
export const ProductDetails:React.FC<ProductDetailProps> = ({products}) => {
console.log(products)

  return (
    <div className="productDetails_container">
      <AppBar />
      <ProductInformation />
      <RelevantProducts products={products} />
      <Footer />
    </div>
  );
};
