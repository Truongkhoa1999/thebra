// lib and material
// import { InstagramIcon } from "../icon/InstgraIcon";
// import { TiktokIcon } from "../icon/TiktokIcon";
import { useEffect, useState } from "react";
import "./style/Footer.scss";

export const Footer = () => {
  const [csVisible, setCSVisible] = useState(false);
  const [atVisible, setATVisible] = useState(false);
  const [fqVisible, setFQVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleOnClickCS = () => {
    if(!isDesktop){
      setCSVisible(!csVisible);
    }
  };
  const handleOnClickAT = () => {
    if (!isDesktop) {
      setATVisible(!atVisible);
    }
  };
  const handleOnClickFQ = () => {
    if (!isDesktop) {
      setFQVisible(!fqVisible);
    }
  };
  useEffect(() => {
    const isDesktopDevice = window.innerWidth >= 768;

    // Set the state variable based on the check
    setIsDesktop(isDesktopDevice);

    // Add a resize event listener to update the state if the window is resized
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [csVisible,atVisible,fqVisible]);

  return (
    <div className="footer_container">
      <div className="upper">TheBra</div>
      <div className="lower">
        <div className="customerservice_container">
          <button onClick={handleOnClickCS} className="button_footer">
            Customer service
          </button>
          {csVisible || isDesktop ? (
            <p>
              We are passionate about the comfort of choosing soft lingerie and
              providing first-class CUSTOMER SERVICE at Thebra. No matter how
              you are thinking about choosing your underwear or where the order
              confirmation takes place, we are always ready to assist you. Our
              contact details and chat hours can be found below. Don't sit and
              think - Get in touch! In our customer service FAQs, you'll find
              our most common questions and answers. Chat <br />
              Mon-Fri 8 - 22 <br />
              Sat-Sun 10-20 <br />
              E-mail thebra.lingerie@gmail.com <br />
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="aboutus_container">
          <button onClick={handleOnClickAT} className="button_footer">
            About Thebra
          </button>

          {atVisible || isDesktop ? (
            <p>
              Welcome to Thebra - our enchanting world of intimate lingerie,
              where style, comfort, and confidence intertwine. As connoisseurs
              of lingerie, we understand the importance of finding the perfect
              bra that uplifts both your spirits and your silhouette. Indulge in
              the beauty of our bra shop and embark on a journey of
              self-discovery, where every bra you choose becomes a reflection of
              your unique allure. Allow us to introduce you to our exceptional
              bra shop in Helsinki (Finland), where elegance meets expertise,
              and every visit is a celebration of your unique beauty. fqVisible
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="fq_container">
          <button onClick={handleOnClickFQ} className="button_footer">
            FAQs
          </button>
          {fqVisible || isDesktop ? (
            <p>
              My Order <br />
              Return & Refund <br />
              Shipping Cost & Delivery Time
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="bottom">
        <p>Design and copy right by Thebra 2023</p>{" "}
      </div>
    </div>
  );
};
