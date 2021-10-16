import React from "react";

export default buffer => {
  return (
    <img
      className="hero-preview"
      src={`data:${buffer.contentType};base64,${Buffer.from(
        buffer.data
      ).toString("base64")}`}
      alt="Hero"
    />
  );
};
