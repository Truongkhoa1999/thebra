// materials
import { ProductsData } from "../../data/ProductsData"
import './style/ProductInformation.scss'
export const ProductInformation = () => {
    return (
        <div className="productInformation_container">
            <div className="productInformation_image">
                <img className="main" src="https://d3d4to3qraukqq.cloudfront.net/pub/Lajittelemattomat+tuotekuvat/SHOCK/ST_2021/SHOCK_ABSORBER_SA_SPORTS_PADDED_TOPATTU_LIIVI_56570491.png?c=is_webp_product_big&fb" alt=" " />
                <div className="minor">
                    <img src="https://d3d4to3qraukqq.cloudfront.net/pub/Lajittelemattomat+tuotekuvat/SHOCK/ST_2021/SHOCK_ABSORBER_SA_SPORTS_PADDED_TOPATTU_LIIVI_56570491.png?c=is_webp_product_big&fb" alt=" " />
                    <img src="https://d3d4to3qraukqq.cloudfront.net/pub/Lajittelemattomat+tuotekuvat/SHOCK/ST_2021/SHOCK_ABSORBER_SA_SPORTS_PADDED_TOPATTU_LIIVI_56570491.png?c=is_webp_product_big&fb" alt=" " />
                </div>
            </div>
            <div className="productInformation_text">
                <div className="title">{ProductsData[0].title}</div>
                <div className="colorSet"></div>
                <div className="textSet">asuhdkashdkjah</div>
                <div className="price">{ProductsData[0].price}</div>
                <div className="buttonSet">
                    <button>Add to cart</button>
                </div>
            </div>

        </div>
    )
}