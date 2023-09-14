import { Link } from "react-router-dom";
import "./style/PopupMenu.scss";
import { smoothScroll } from "../../util/window/smoothScroll";

export const PopupMenu = ({ className }: { className: string }) => {
  const handleScroll = () => {
    smoothScroll("posts", true);
  };

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
        <button onClick={handleScroll} className="menuLink ">
          Products
        </button>
        {/* <Link to="/homepage/#posts" className="menuLink ">
          Products
        </Link> */}
        <Link to="/signin" className="menuLink ">
          Contact
        </Link>
      </div>
    </div>
  );
};
