import { Link } from "react-router-dom";
import "./style/PopupMenu.scss";
import { smoothScroll } from "../../util/window/smoothScroll";

export const PopupMenu = ({ className }: { className: string }) => {


  return (
    <div className={className}>
      <div className="menu_container">
        {/* <Link to="/signin" className="menuLink " onClick={handleAuthenticationStatus}>
          {
            isSignedIn ? "Sign-out" : "Sign-in"
          }
        </Link> */}
        <Link to="/homepage" className="menuLink ">
          Home
        </Link>
   
            <Link
              className="menuLink "
              to={"/homepage#posts"}
              onClick={() => smoothScroll("posts", true)}
            >Products</Link>
        <Link to="/contact" className="menuLink ">
          Contact
        </Link>
      </div>
    </div>
  );
};
