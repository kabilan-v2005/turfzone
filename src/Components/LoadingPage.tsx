import React from "react";
import "./LoadingPage.css";

const LoadingPage: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="football" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;
