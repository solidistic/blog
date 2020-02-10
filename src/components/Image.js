import React from "react";

const Image = ({
  imageName,
  type = "hero",
  path = "http://localhost:8080/images/",
  ...props
}) => {
  const style = type === "hero" ? "hero-preview" : "gallery__image";

  return (
    <img
      key={Math.random() * 1000}
      className={style}
      src={path + imageName}
      alt={imageName}
      {...props}
    />
  );
};

export default Image;
