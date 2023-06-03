// lib and material
import './style/Carousel.scss'
const Carousel = () => {
  return (
    <div className="carousel_container">
      <div className="information">
        <h1>TheBra</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          voluptate tenetur incidunt dolores, a voluptas explicabo harum
          perspiciatis quia atque, provident natus soluta asperiores blanditiis.
          Eveniet voluptate maxime earum quis?
        </p>
      </div>
      <div className="products_container">
        <img
          src="https://d3d4to3qraukqq.cloudfront.net/pub/Lajittelemattomat+tuotekuvat/SHOCK/ST_2021/SHOCK_ABSORBER_SA_SPORTS_PADDED_TOPATTU_LIIVI_56570491.png?c=is_webp_product_big&fb"
          alt="1"
        />
      </div>
    </div>
  );
};
export default Carousel