import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api";
import LoadingPage from "./LoadingPage";
import Image from "./Image";

const ImageGallery = ({ currentHeroImage, startSetFile }) => {
  const [images, setImages] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await api.getImages();
      if (res.status !== 200) return setError("Unable to fetch images");
      setImages(res.data.files);
    };
    if (!images) fetchImages();
  }, [images]);

  if (!images) return <LoadingPage />;
  else {
    return (
      <div className="gallery">
        <div className="gallery__preview">
          <Image
            imageName={currentHeroImage || images[0]}
            className="gallery__image gallery__image--big"
          />
        </div>
        <div className="gallery__list">
          {images &&
            images.map((image, index) => {
              let styles;
              if (!image) return null;
              if (currentHeroImage && currentHeroImage === image) {
                styles =
                  "gallery__image gallery__image--current gallery__image--list";
              } else styles = "gallery__image gallery__image--list";
              return (
                <Image
                  key={index}
                  imageName={image}
                  className={styles}
                  onClick={() => {
                    startSetFile(image);
                  }}
                />
              );
            })}
        </div>
      </div>
    );
  }
};

export default ImageGallery;
