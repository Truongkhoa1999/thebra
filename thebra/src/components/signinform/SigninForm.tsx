// utils

// style
import { useDispatch } from "react-redux";
import { handleSignIn } from "../../util/login/handleSignIn";
import "./style/signinform.scss";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleIfNonUserConflictWithLoginUser } from "../../util/guest/handleIfNonUserConflictWithLoginUser";
export const SigninForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget as HTMLFormElement;
    const { username, password } = formElements.elements as unknown as {
      username: { value: string };
      password: { value: string };
    };
    setIsLoading(true);
    handleIfNonUserConflictWithLoginUser();
    // >>>>>>
    try {
      const handleSignInResponse = await dispatch(
        handleSignIn(username.value, password.value, navigate)
      );
      if (typeof handleSignInResponse === "string") {
        setErrorMess(handleSignInResponse);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMess("An error occurred. Please try again later.");
    }
    // >>>>>
  };
  return (
    <div className="form_container">
      <h1>Login</h1>
      {errorMess && (
        <div className="error-message">
          <p>{errorMess}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input_container">
          <div>
            <label htmlFor="username">Email</label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>
        </div>

        <div className="submit_container">
          <button
            className={`button1 login_button ${
              isLoading ? "isLoginLoading" : ""
            }`}
            type="submit"
          >
            <span
              className={`button-content ${isLoading ? "loading-text" : ""}`}
            >
              {isLoading ? "Loading..." : "Login"}
            </span>
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className=" button1 newaccount_button"
          >
            create an account
          </button>
        </div>
      </form>
      {/* Display the error message conditionally */}
    </div>
  );
};
