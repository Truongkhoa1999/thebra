export const ShippingInfo = () => {
  return (
    <div className="secureInfo_container">
      <h2> 🚚 Free shipping for all orders:</h2>
      <div className="infos">
        <p>
          - That within <span style={{ color: "blue" }}>Finland</span> 🇫🇮 over
          49.00€
        </p>
        <p>
          - That among{" "}
          <span style={{ color: "green" }}>Latvia Lithuania, and Estonia</span>{" "}
          over 89.00€
        </p>
        <p>
          - That among{" "}
          <span style={{ color: "green" }}>
            Central and Western European Union
          </span>{" "}
          Countries over 149.00€
        </p>
      </div>
      <h4 style={{"paddingBottom": "1rem"}}>
        Courier company:{" "}
        <span style={{ color: "orange" }}>
        &nbsp;
          <img
            src="https://aimg.kwcdn.com/upload_aimg/euler/7f8a570d-6572-4140-89a5-46b8aa6f5b59.png.slim.png?imageView2/2/w/48/q/70/format/webp"
            alt="postilogo"
            style={{ width: "25px" }}
          />
          &nbsp;
           Posti
        </span>
      </h4>
    </div>
  );
};
