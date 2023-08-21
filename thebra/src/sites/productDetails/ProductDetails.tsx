// Components
import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import { ProductInformation } from "../../components/products/ProductInformation";
import { ProductProps } from "../../type/ProductProps";

interface ProductDetailProps  {
  products: ProductProps[];
}
export const ProductDetails:React.FC<ProductDetailProps> = () => {

  return (
    <div className="productDetails_container">
      <AppBar />
      <ProductInformation />
      <Footer />
    </div>
  );
};
