import React from 'react';
import './style/preloader.scss'
const Preloader: React.FC = () => {
  return (
    <main>
      <div className="preloader">
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
      </div>
      <div className="status">
        Loading
        <span className="status__dot">.</span>
        <span className="status__dot">.</span>
        <span className="status__dot">.</span>
      </div>
    </main>
  );
};

export default Preloader;
