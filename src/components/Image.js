import React from "react";

const Image = ({
  imageName,
  type = "hero",
  path = "http://localhost:8080/images/",
  ...props
}) => {
  return <img src={path + imageName} alt={imageName} {...props} />;
};

export default Image;
