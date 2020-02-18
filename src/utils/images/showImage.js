import React from "react";

export default (image, key, type = "hero") => {
  const style = type === "hero" ? "hero-preview" : "gallery__image";
  return (
    <img
      key={key}
      className={style}
      src={`http://localhost:8080/images/${image}`}
      alt="testi"
    />
  );
};
