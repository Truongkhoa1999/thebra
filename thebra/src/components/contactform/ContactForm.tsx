import { FormEvent, useState } from "react";
import "./style/contactform.scss";
import { EmailContentProps } from "../../type/EmailContentProps";
import { handleSendMail } from "../../util/email/handleSendMail";
import GeneralNotification from "../notification/GeneralNotification";

export const ContactForm = () => {
  const initialEmailContent: EmailContentProps = {
    gmail: "",
    subject: "",
    body: "",
  };
  const [emailContent, setEmailContent] = useState(initialEmailContent);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setIsNotificationVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmailContent({
      ...emailContent,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleSendMail(emailContent);
      setIsLoading(false);
      setIsNotificationVisible(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="form-container">
      <h1>TELL US YOUR CONCERNS</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="gmail"
          placeholder="Your email address"
          name="gmail"
          value={emailContent.gmail}
          required
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Your subject?"
          name="subject"
          value={emailContent.subject}
          required
        />
        <textarea
          onChange={handleChange}
          placeholder="Your message"
          name="body"
          value={emailContent.body}
          required
        />
        <input
          className={isLoading ? "loading-text" : ""}
          type="submit"
          value={isLoading ? "Loading..." : "Submit"}
        />
        {notification ? (
          <GeneralNotification
            notification="Your email has been sent. Thank you!"
            className="signin-notification"
            setIsNotificationVisible={setIsNotificationVisible}
          />
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
