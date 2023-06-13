// lib and material
import { Link } from "react-router-dom";
import "./style/AppBar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import logo from '../../assets/logo.png'
const AppBar = () => {
  return (
    <div className="app_container">
      <MenuIcon />
      <Link to ='/homepage'>
      <img src={logo} alt="" />
      </Link>
      <p>cart (2)</p>
    </div>
  );
};
export default AppBar;
