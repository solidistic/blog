import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api";
import Image from "./Image";

const ImageGallery = ({ input, currentImageName }) => {
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
    <div className="content-container gallery">
      {images &&
        images.map((image, index) => {
          let activeImage = false;
          if (currentImageName && currentImageName === image)
            activeImage = true;
          console.log(currentImageName, image);
          return (
            <Image
              key={index}
              imageName={image}
              type="gallery"
              onClick={() => console.log("click")}
              active={activeImage}
            />
          );
        })}
    </div>
  );
};

export default ImageGallery;
