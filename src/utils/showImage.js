import React from "react";

export default image => {
  return (
    <img
      className="hero-preview"
      src={`http://localhost:8080/images/${image.name}`}
      alt="testi"
    />
  );
};
