import { useDispatch } from "react-redux";
import "./style/signupform.scss";



import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../../util/signup/handleSignUp";
import { useState } from "react";
import GeneralNotification from "../notification/GeneralNotification";
import { checkIfRegisterInfoValid } from "../../util/signup/checkIfRegisterInfoValid";

export const SignupForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [notification, setNotification] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget
      .elements as HTMLFormControlsCollection & {
      username: { value: string };
      password: { value: string };
      lastName: { value: string };
      firstName: { value: string };
      phone: { value: string };
      gmail: { value: string };
    };

    const { username, password, lastName, firstName, phone, gmail } =
      formElements;

    const newUser = {
      username: username.value,
      password: password.value,
      lastName: lastName.value,
      firstName: firstName.value,
      phone: phone.value,
      gmail: gmail.value,
    };

    try {
      const checkResult = await checkIfRegisterInfoValid(newUser);
      if (await checkResult === "Passed") {
        setIsNotificationVisible(false);
        dispatch(handleSignUp(newUser, navigate));
      } else {
        setNotification(checkResult); // Assign the response message directly
        setIsNotificationVisible(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    
  };

  return (
    <div className="form_container">
      <h1>Register New Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="input_container">
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              required
            />
          </div>
          <div>
            <label htmlFor="gmail">Gmail</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              placeholder="Gmail"
              required
            />
          </div>
        </div>
        <div className="submit_container">
          <button className="button2 signup_button" type="submit">
            Register
          </button>
        </div>
      </form>
      {isNotificationVisible && (<GeneralNotification notification={notification}  setIsNotificationVisible={setIsNotificationVisible} className="notification" />)}
    </div>
  );
};
