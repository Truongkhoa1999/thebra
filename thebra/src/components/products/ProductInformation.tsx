// materials
import "./style/ProductInformation.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import { AppDispatch, RootState } from "../../redux/store";
import { getProductById } from "../../redux/actions/getProductById";


export const ProductInformation = () => {
  const { id } = useParams<{ id: ReturnType<typeof uuidv4>}>()
  const dispatch = useDispatch<AppDispatch>()
  const { productById } = useSelector((state: RootState) => state.productById)

useEffect(
  () => {
    if(id) {
      dispatch(getProductById(id))
      console.log(productById)
    }
  },[dispatch]
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
          <div className="left">
            <div className="title">{productById?.title}</div>
            <div className="size_group">
              <h4>Size</h4>
              <button className="sizeSelection">34</button>
              <button className="sizeSelection">36</button>
            </div>
          </div>
          <div className="right">
            <div className="price">{productById?.price} €</div>
          </div>
          <div className="buttons">
            <button className="addcart">Buy it</button>
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
          src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/sizeguide.jpg?alt=media&token=16fdbc58-e153-4bc8-8041-503901c4743b"
          alt=" "
        />
      </div>
    </div>
  );
};
