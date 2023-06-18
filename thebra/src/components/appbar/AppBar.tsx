// lib and material
import { Link } from "react-router-dom";
import "./style/AppBar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";
import { PopupMenu } from "./PopupMenu";

import Marquee from "./Marquee";
import { useState } from "react";
const AppBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const openMenu = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div className="app_container">
      <div className="upper">
        {/* <div className="userAvatar" title="You are signed in">
          <img
            className="avatar"
            src="https://img.freepik.com/free-icon/user_318-563642.jpg"
            alt=" "
          />
          <div className="status"></div>
        </div> */}
        <button onClick={openMenu}>
          <MenuIcon />
        </button>

        <Link to="/homepage">
          <div className="logo_container"></div>
        </Link>
        <p>cart (2)</p>
      </div>
      <div className="lower">
        <Marquee />
        {isOpened && <PopupMenu className="popupmenu" />}
      </div>
    </div>
  );
};
export default AppBar;
