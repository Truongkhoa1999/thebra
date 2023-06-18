// lib and material
import { Link } from "react-router-dom";
import "./style/AppBar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";
import { PopupMenu } from "./PopupMenu";
import { useState } from "react";
const AppBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="app_container">
      <div className="upper">
        <button onClick={handleClick} className="menu_button">
          <MenuIcon />
        </button>
        <Link to="/homepage">
          <img src={logo} alt="" />
        </Link>
        <p>cart (2)</p>
      </div>
      <div className="lower">
        {showMenu && <PopupMenu className="popupmenu" />}
      </div>
    </div>
  );
};
export default AppBar;
