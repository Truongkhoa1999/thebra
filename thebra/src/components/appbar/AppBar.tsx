// lib and material
import { Link } from "react-router-dom";
import "./style/AppBar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";
import { PopupMenu } from "./PopupMenu";
import { useState } from "react";
import Marquee from "./Marquee";
const AppBar = () => {

  return (
    <div className="app_container">
        <div className="upper">
      <Marquee />
        < PopupMenu className="popupmenu" />
      </div>
      <div className="lower">
        <div className="userAvatar" title="You are signed in">
          <img className="avatar" src="https://img.freepik.com/free-icon/user_318-563642.jpg" alt=" " />
          <div className="status"></div>
        </div>
        <Link to="/homepage">
          <img src={logo} alt="" />
        </Link>
        <p>cart (2)</p>
      </div>
    
    </div>
  );
};
export default AppBar;
