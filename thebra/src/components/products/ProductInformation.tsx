// materials
import { ProductsData } from "../../data/ProductsData";
import "./style/ProductInformation.scss";
export const ProductInformation = () => {
  return (
    <div className="productInformation_container">
      <div className="productInformation_image">
        <div className="main">
          <img
            src="https://d3d4to3qraukqq.cloudfront.net/pub/Lajittelemattomat+tuotekuvat/SHOCK/ST_2021/SHOCK_ABSORBER_SA_SPORTS_PADDED_TOPATTU_LIIVI_56570491.png?c=is_webp_product_big&fb"
            alt=" "
          />
        </div>

        <div className="minor">
          <img
            src="https://d3d4to3qraukqq.cloudfront.net/pub/Lajittelemattomat+tuotekuvat/SHOCK/ST_2021/SHOCK_ABSORBER_SA_SPORTS_PADDED_TOPATTU_LIIVI_56570491.png?c=is_webp_product_big&fb"
            alt=" "
          />
          <img
            src="https://d3d4to3qraukqq.cloudfront.net/pub/Lajittelemattomat+tuotekuvat/SHOCK/ST_2021/SHOCK_ABSORBER_SA_SPORTS_PADDED_TOPATTU_LIIVI_56570491.png?c=is_webp_product_big&fb"
            alt=" "
          />
        </div>
      </div>
      <div className="productInformation_text">
        <div className="buttonSet">
          <div className="size_group">
            <h4>Size</h4>
            <button className="sizeSelection">34</button>
            <button className="sizeSelection">36</button>
          </div>
          <button className="addcart">Add to cart</button>
        </div>
        <div className="price">{ProductsData[0].price} €</div>
        <div className="title">{ProductsData[0].title}</div>
        <div className="textSet">
          Going the extra mile to look good, will make you feel good too and
          this three-pack plunge bra is a sleek addition to your intimates
          collection. Ideal for low necklines as well as everyday tanks and
          T-Shirts, the supportive cups and plunge neck will give you a
          comfortable lift whilst the smooth fabric will help clothes glide over
          with ease. Machine washable. 3 x Bra 90% Cotton, 10% Elastane.
          **Please click here to use the NEW bra size calculator**
        </div>
      </div>
      <div className="sizeguide">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/sizeguide.jpg?alt=media&token=16fdbc58-e153-4bc8-8041-503901c4743b"
          alt=" "
        />
      </div>
    </div>
  );
};
