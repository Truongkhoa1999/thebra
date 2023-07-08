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
const AppBar = () => {
  const [isOpened, setIsOpened] = useState(false);
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
            <ShoppingCartIcon style={{ fontSize: "1.25rem" }} />
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
