import { Link } from "react-router-dom";
import "./style/PopupMenu.scss";
// import { useEffect, useState } from "react";
// import { isUserSignedIn } from "../../util/checkingSigninStatus/isUserSignedIn";
export const PopupMenu = ({ className }: { className: string }) => {
  // const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());
  // useEffect(() => {
  //   setIsSignedIn(isUserSignedIn());
  // }, []);

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
        <Link to="/signin" className="menuLink ">
          Products
        </Link>
        <Link to="/signin" className="menuLink ">
          Contact
        </Link>
      </div>
    </div>
  );
};
