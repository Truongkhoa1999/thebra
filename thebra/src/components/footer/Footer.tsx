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
            HAIR & BEAUTY CARE are our passions at Lyko, as is providing
            absolutely first-class CUSTOMER SERVICE. We'll help you figure out
            how to make your curls last longer, which lipstick goes with your
            weekend outfit, which beard trimmer gives the best results or where
            in the world the order confirmation disappeared - we're here for
            you! You can find our contact information and customer service
            opening hours below. There are no stupid questions - feel free to
            contact us! Psst! You can find answers to the most common questions
            on the Frequently Asked Questions page.
          </p>
          <p>
            VISITING HOURS: Chat Mon-Fri 09:00 - 16:00 By e-mail:
            kaskapalvelu@lyko.fi
          </p>
        </div>
        <div className="information_container">
          <button className="button_footer">Information</button>
          <p>
            Club Lyko My Pages Club Lyko Privacy Policy FAQ - Frequently Asked
            Questions Privacy Notice Cookie Policy Order Terms About Lyko
            Recommend to a friend Are you interested in cooperation with Lyko?
            Toplist Discount codes Michael Edwards Fragrances of the World
          </p>
        </div>
        <div className="newsletter_container">
          <div className="upper_newsletter">
            <button className="button_footer">News and offer</button>
            <div className="letter_form">
              <p>
                Subscribe to our newsletter and join our SMS list to get
                information about current offers and campaigns!
              </p>
              <form className="newsletter_form">
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  required
                  placeholder="Email address"
                  className="input_text"
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
                />
                <br />
                <br />

                <input type="submit" value="Submit" />
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
