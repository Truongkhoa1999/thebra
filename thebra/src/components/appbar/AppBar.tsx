// lib and material
import { Link } from "react-router-dom";
import "./style/AppBar.scss";
import MenuIcon from "@mui/icons-material/Menu";

const AppBar = () => {
  return (
    <div className="app_container">
      <MenuIcon />
      <Link to ='/homepage'>
      <h1>TheBra</h1>
      </Link>
      <p>cart (2)</p>
    </div>
  );
};
export default AppBar;
