import { EmailContentProps } from "../../type/EmailContentProps";

export const handleSendMail = async (emailContent:EmailContentProps) => {
    const URL = "https://thebrabe.onrender.com/api/v1/email/client";
    try {
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(emailContent),
      });
    } catch (error) {
      console.log(error);
    }
  };