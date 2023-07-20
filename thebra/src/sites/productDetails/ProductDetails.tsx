// Components
import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import { ProductInformation } from "../../components/products/ProductInformation";
import { ProductProps } from "../../type/ProductProps";
import { RelevantProductsById } from '../../components/products/RelevantProductsById';

interface ProductDetailProps  {
  products: ProductProps[];
}
export const ProductDetails:React.FC<ProductDetailProps> = ({products}) => {

  return (
    <div className="productDetails_container">
      <AppBar />
      <ProductInformation />
      <RelevantProductsById products={products} />
      <Footer />
    </div>
  );
};
