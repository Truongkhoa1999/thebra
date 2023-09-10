import { useNavigate } from "react-router-dom";
import "./style/userpopupmenu.scss";
import { RemoveJwt } from "../../util/checkingSigninStatus/RemoveJwt";
import { RemoveIsNonUser } from "../../util/guest/handleIfNonUserConflictWithLoginUser";
export const UserPopUpMenu = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    RemoveJwt();
    RemoveIsNonUser();
    navigate("/signin");
  };
  return (
    <div className="userPopUpMenu_container">
      <div onClick={handleSignOut}>{isSignedIn ? "Sign-out" : "Sign-in"}</div>
      <div onClick={() => navigate("/myOrders")}>My Orders</div>
    </div>
  );
};
