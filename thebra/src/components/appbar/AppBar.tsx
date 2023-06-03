// lib and material
import "./style/AppBar.scss";
import MenuIcon from "@mui/icons-material/Menu";

const AppBar = () => {
  return (
    <div className="app_container">
      <MenuIcon />
      <h1>TheBra</h1>
      <p>cart (2)</p>
    </div>
  );
};
export default AppBar;
