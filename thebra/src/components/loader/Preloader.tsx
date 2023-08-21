import React from "react";
import "./style/preloader.scss";
const Preloader: React.FC = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default Preloader;
