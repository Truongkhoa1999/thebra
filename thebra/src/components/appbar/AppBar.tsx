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
import { isUserSignedIn } from "../../util/checkingSigninStatus/isUserSignedIn";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CartProps } from "../../type/CartProps";
import { smoothScroll } from "../../util/window/smoothScroll";
import { UserPopUpMenu } from "./UserPopUpMenu";
const AppBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());

  const { cart } = useSelector((state: RootState) => state.cart);
  const totalQuantity = cart.reduce(
    (total: number, item: CartProps) =>
      total + item.productSize["34"] + item.productSize["36"],
    0
  );

  const openMenu = () => {
    setIsOpened(!isOpened);
  };
  const openUserMenu = () => {
    setIsUserMenuOpened(!isUserMenuOpened);
  };

  useEffect(() => {
    setIsSignedIn(isUserSignedIn());
  }, []);

  return (
    <div className="app_container">
      <Marquee />
      <div className="upper">
        <div className="hamburger" onClick={openMenu}>
          <MenuIcon className="menuIcon" />
        </div>
        <div className="sites ">
          <ul className={`siteLinks ${isOpened ? "siteLinks--visible" : ""}`}>
            <Link className="link" to={"/homepage"}>
              <li>Home</li>
            </Link>
            <Link
              className="link"
              to={"/homepage#posts"}
              onClick={() => smoothScroll("posts", true)}
            >
              <li>Product</li>
            </Link>
            <Link className="link" to={"/contact"}>
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div className="logo_container">
          <div>
            <Link style={{ textDecoration: "none" }} to="/homepage">
              <img
                className="myLogo"
                src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/LOGO%2FDC05151B-1FCB-4FDE-96C8-301D13A2B0EB_4_5005_c.jpeg?alt=media&token=3e210d80-7f3b-4d32-9ee1-7bf851d38733"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="appbar_button" style={{ overflow: "visible" }}>
          <button className="icon" style={{ overflow: "visible" }}>
            <Link to={`/cart`} style={{ overflow: "visible" }}>
              <Badge
                badgeContent={totalQuantity}
                color="primary"
                style={{ overflow: "visible" }}
              >
                <ShoppingCartIcon
                  style={{ fontSize: "1.15rem", color: "black" }}
                />
              </Badge>
            </Link>
          </button>
          <button className="icon">
            <AccountCircleIcon
              // onClick={handleAuthenticationStatus}
              onClick={openUserMenu}
              className={`accountButton ${
                isSignedIn ? "accountButton--active" : ""
              }`}
              style={{ fontSize: "1.15rem" }}
            />
            {isUserMenuOpened ? <UserPopUpMenu isSignedIn={isSignedIn} /> : ""}
          </button>

          <button className="icon-ban" disabled={true}>
            <FavoriteIcon
              style={{
                fontSize: "1.15rem",
                cursor: "default",
                color: "gray",
              }}
            />
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
