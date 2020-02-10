import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api";
import Image from "./Image";

const ImageGallery = ({ input }) => {
  const [images, setImages] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await api.getImages();
      if (res.status !== 200) return setError("Unable to fetch images");
      setImages(res.data.files);
    };
    console.log(images);
    if (!images) fetchImages();
  }, [images]);

  return (
    <div className="content-container">
      {images &&
        images.map((image, index) => {
          return (
            <Image
              imageName={image}
              key={index}
              type="gallery"
              onClick={() => console.log("click")}
            />
          );
        })}
    </div>
  );
};

export default ImageGallery;
