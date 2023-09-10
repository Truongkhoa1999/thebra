import { setToken } from "../../redux/actions/getToken";

export const handleSignIn = (
  username: string,
  password: string,
  navigate: Function
) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        "https://thebrabe.onrender.com/api/v1/customers/signin2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (response.status === 401) {
        // Handle 401 Unauthorized Error
        const errorData = await response.json();
        if(errorData.error){
          return errorData.error
        }
      } else if (response.ok) {
        const { token } = await response.json();
        dispatch(setToken(token));
        localStorage.setItem("jwt", token);
        navigate("/homepage");
      } else {
        console.log("Other Error:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return "Undefined error occurred.";
    }
  };
};
