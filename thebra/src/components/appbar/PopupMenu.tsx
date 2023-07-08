import { Link } from "react-router-dom";
import "./style/PopupMenu.scss";
import { useEffect, useState } from "react";
import { isUserSignedIn } from "../../util/checkingSigninStatus/isUserSignedIn";
import { handleAuthenticationStatus } from "../../util/checkingSigninStatus/handleAuthenticationStatus";
export const PopupMenu = ({ className }: { className: string }) => {
  const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());
  useEffect(() => {
    setIsSignedIn(isUserSignedIn());
  }, []);

  return (
    <div className={className}>
      <div className="menu_container">
        <Link to="/signin" className="menuLink " onClick={handleAuthenticationStatus}>
          {
            isSignedIn ? "Sign-out" : "Sign-in"
          }
        </Link>

        <Link to="/signin" className="menuLink ">
          New arrivals
        </Link>
        <Link to="/signin" className="menuLink ">
          Coming soon
        </Link>
        <Link to="/signin" className="menuLink ">
          Sale
        </Link>
      </div>
    </div>
  );
};
