export const checkIfRegisterInfoValid = async (newUser: {
  username: string;
  password: string;
  lastName: string;
  firstName: string;
  phone: string;
  gmail: string;
}) => {
  const url = "https://thebrabe.onrender.com/api/v1/customers/pregister";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
 
      const responseData = await response.text();
      console.log("Response status:", response.status);
      console.log("Response body:", responseData);

      return responseData;
    
  } catch (error) {
    console.error("An error occurred during fetch:", error);
    throw new Error("Failed to validate information.");
  }
};

