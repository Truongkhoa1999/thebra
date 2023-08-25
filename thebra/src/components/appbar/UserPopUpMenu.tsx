import { useNavigate } from "react-router-dom";
import "./style/userpopupmenu.scss";
import { RemoveJwt } from "../../util/checkingSigninStatus/RemoveJwt";
export const UserPopUpMenu = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    RemoveJwt(); // Call the function to remove JWT
    navigate("/signin"); // Navigate to the specified route
  };
  return (
    <div className="userPopUpMenu_container">
     <div onClick={handleSignOut}>
        {isSignedIn ? "Sign-out" : "Sign-in"}
      </div>
      <div onClick={() => navigate("/myorders")}>My Orders</div>
    </div>
  );
};
