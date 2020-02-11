import React from "react";

const Image = ({
  imageName,
  type = "hero",
  path = "http://localhost:8080/images/",
  active,
  ...props
}) => {
  const style = type === "hero" ? "hero-preview" : "gallery__image";
  const activeStyle = active ? "gallery__image--current" : "";

  return (
    <img
      className={style + " " + activeStyle}
      src={path + imageName}
      alt={imageName}
      {...props}
    />
  );
};

export default Image;
