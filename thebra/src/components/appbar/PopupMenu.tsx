import { Link } from "react-router-dom";
import "./style/PopupMenu.scss";
export const PopupMenu = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <div className="menu_container">
        <Link to="/signin" className="menuLink ">
          Sign-in
        </Link>
        <Link to="/signin" className="menuLink ">
          Sign-in
        </Link>
      </div>
    </div>
  );
};
