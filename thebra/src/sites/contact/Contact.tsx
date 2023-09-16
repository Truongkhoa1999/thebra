import AppBar from "../../components/appbar/AppBar";
import { ContactForm } from "../../components/contactform/ContactForm";
import { Footer } from "../../components/footer/Footer";
import "./style/contact.scss";
export const Contact = () => {
  return (
    <div className="contact-container">
      <AppBar />
      <ContactForm />
      <Footer />
    </div>
  );
};
