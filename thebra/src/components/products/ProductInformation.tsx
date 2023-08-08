// materials
import "./style/ProductInformation.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import { AppDispatch, RootState } from "../../redux/store";
import { getProductById } from "../../redux/actions/getProductById";
import { handleSaveCart } from "../../util/cart/handleSaveCart";
import { handleSize34Confirm, handleSize36Confirm } from "../../util/sizeSelection/sizeSelection";


export const ProductInformation = () => {
  const { id } = useParams<{ id: ReturnType<typeof uuidv4> }>()
  const dispatch = useDispatch<AppDispatch>()
  const { productById } = useSelector((state: RootState) => state.productById)
  const { cart } = useSelector((state: RootState) => state.cart)
  const [is34, setIs34] = useState(false)
  const [is36, setIs36] = useState(false)

  useEffect(
    () => {
      if (id) {
        dispatch(getProductById(id))
      }

    }, [dispatch]
  )

  return (
    <div className="productInformation_container">
      <div className="productInformation_image">
        <div className="main">
          <img
            src={productById?.images[0]}
            alt=" "
          />
        </div>

        <div className="minor">
          <img
            src={productById?.images[1]}
            alt=" "
          />
          <img
            src={productById?.images[2]}
            alt=" "
          />
        </div>
      </div>
      <div className="productInformation_text">
        <div className="buttonSet">
            <h5>The Bra</h5>
            <div className="title">{productById?.title}</div>
            <div className="price">{productById?.price} €</div>
            <h5>Included Tax</h5>
            <div className="size_group">
              <h4>Size</h4>
              <div>
              <button className={`sizeSelection ${is34 ? "activated" : ""}`} onClick={() => handleSize34Confirm(is34, setIs34)}>34</button>
              <button className={`sizeSelection ${is36 ? "activated" : ""}`} onClick={() => handleSize36Confirm(is36, setIs36)}>36</button>
              </div>
            </div>
          <div className="buttons">
            <button onClick={() => { if (productById && (is34 || is36)) { handleSaveCart(dispatch, productById, cart, is34, is36) } }} className="addcart">Buy it</button>
            <button className="favorite">
              <FavoriteIcon />
            </button>
          </div>
        </div>
        <div className="textSet">
          {productById?.description}
        </div>
      </div>
      <div className="sizeguide">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/sizechart.avif?alt=media&token=d917a8d2-db04-4297-b416-51544a4268d4"
          alt=" "
        />
      </div>
    </div>
  );
};
