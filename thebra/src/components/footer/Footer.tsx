// lib and material
import "./style/Footer.scss";
import { Facebook, Instagram } from "@mui/icons-material";

export const Footer = () => {
  return (
    <div className="footer_container">
      <h1 className="upper">TheBra</h1>
      <div className="lower">
        <div className="customerservice_container">
          <button className="button_footer">Customer service</button>
          <p>
            We are passionate about the comfort of choosing soft lingerie and
            providing first-class CUSTOMER SERVICE at Thebra. No matter how you
            are thinking about choosing your underwear or where the order
            confirmation takes place, we are always ready to assist you. Our
            contact details and chat hours can be found below. Don't sit and
            think - Get in touch! In our customer service FAQs, you'll find our
            most common questions and answers.
          </p>
          <p>
            Chat <br />
            Mon-Fri 8 - 22 <br />
            Sat-Sun 10-20 <br />
            E-mail thebra.lingerie@gmail.com <br />
          </p>
        </div>
        <div className="information_container">
          <button className="button_footer">About Thebra</button>
          <p>
            Welcome to Thebra - our enchanting world of intimate lingerie, where
            style, comfort, and confidence intertwine. As connoisseurs of
            lingerie, we understand the importance of finding the perfect bra
            that uplifts both your spirits and your silhouette. Indulge in the
            beauty of our bra shop and embark on a journey of self-discovery,
            where every bra you choose becomes a reflection of your unique
            allure. Allow us to introduce you to our exceptional bra shop in
            Helsinki (Finland), where elegance meets expertise, and every visit is a
            celebration of your unique beauty.
          </p>
        </div>
        <div className="newsletter_container">
          <div className="upper_newsletter">
            <button className="button_footer">FAQs</button>
            <div className="letter_form">
              <p>
                My Order <br />
                Return Policy <br />
                Shipping Cost & Delivery Time 
              </p>
              <form className="newsletter_form">
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  required
                  placeholder="Email address"
                  className="input_text"
                  disabled={true}
                />
                <br />
                <br />

                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  required
                  placeholder="Telephone"
                  className="input_text"
                  disabled={true}
                />
                <br />
                <br />

                <input
                  className="submit-button"
                  type="submit"
                  value="Submit"
                  disabled={true}
                />
              </form>
            </div>
          </div>
          <div className="lower_newsletter">
            <button className="button_footer">Follow us</button>
            <div className="social_ic">
              <Facebook />
              <Instagram />
            </div>
          </div>
        </div>
      </div>
      <h4 className="bottom">Copyright 2023</h4>
    </div>
  );
};
