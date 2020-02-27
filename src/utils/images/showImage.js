import React from "react";

export default (image, key, type = "hero") => {
  const style = type === "hero" ? "hero-preview" : "gallery__image";
  return (
    <img
      key={key}
      className={style}
      src={`https://solidistic-blog.s3.eu-north-1.amazonaws.com/images/${image}`}
      alt="testi"
    />
  );
};
