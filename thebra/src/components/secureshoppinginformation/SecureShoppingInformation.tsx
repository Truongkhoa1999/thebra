import "./style/ssi.scss";
export const SecureShoppingInformation = () => {
  return (
    <div className="secureInfo_container">
      <h2> 🛡️ Shopping security</h2>
      <div className="infos">
        <p>
          - Purchase protection by <span style={{ color: "blue" }}>Stripe</span>{" "}
        </p>
        <p>- Trackable paid orders</p>
        <p>- Securce privacy</p>
      </div>
    </div>
  );
};
