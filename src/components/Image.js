import React from "react";

const Image = ({
  imageName,
  type = "hero",
  url = "http://localhost:8080/images/",
  ...props
}) => {
  return <img src={url + imageName} alt={imageName} {...props} />;
};

export default Image;
