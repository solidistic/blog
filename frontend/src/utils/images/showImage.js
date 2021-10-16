import React from "react";

export default (image, local = false,  type = "hero") => {
  const style = type === "hero" ? "hero-preview" : "gallery__image";
  const path = local
    ? ""
    : "https://solidistic-blog.s3.eu-north-1.amazonaws.com/images/";
  return <img className={style} src={path + image} alt="testi" />;
};
