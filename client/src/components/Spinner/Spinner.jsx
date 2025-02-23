import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}

export default Spinner;