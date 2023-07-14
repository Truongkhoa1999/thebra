// lib and material
import { Link } from "react-router-dom";
import "./style/AppBar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { PopupMenu } from "./PopupMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Marquee from "./Marquee";
import { useEffect, useState } from "react";
import { handleAuthenticationStatus } from "../../util/checkingSigninStatus/handleAuthenticationStatus";
import { isUserSignedIn } from "../../util/checkingSigninStatus/isUserSignedIn";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CartProps } from "../../type/CartProps";
const AppBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { cart } = useSelector((state: RootState) => state.cart)
  const totalQuantity = cart.reduce((total:number, item:CartProps) => total + item.productSize['34'] + item.productSize['36'], 0);





  const openMenu = () => {
    setIsOpened(!isOpened);
  };
  const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());
  useEffect(() => {
    setIsSignedIn(isUserSignedIn());
  }, []);

  return (
    <div className="app_container">
      <Marquee />
      <div className="upper">
        <button onClick={openMenu}>
          <MenuIcon />
        </button>
        <Link to="/homepage">
          <div className="logo_container"></div>
        </Link>
        <div className="appbar_button">
          <button className="shoppingcarticon">
          <Link to={`/cart`}>

          <Badge badgeContent = {totalQuantity} color="primary">
            <ShoppingCartIcon style={{ fontSize: "1.25rem" }} />
            </Badge>
            </Link>
    
          </button>
          <button>
            <AccountCircleIcon onClick={handleAuthenticationStatus} className={`accountButton ${isSignedIn ? "accountButton--active" : ""}`} style={{ fontSize: "1.25rem" }} />
          </button>
          <button>
            <FavoriteIcon style={{
              fontSize: "1.25rem",
            }} />
          </button>
        </div>
      </div>
      <div className="lower">
        {isOpened && <PopupMenu className="popupmenu" />}
      </div>
    </div>
  );
};
export default AppBar;
