import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api";
import LoadingPage from "./LoadingPage";
import Image from "./Image";

// CurrentHroImage ei käytössä atm, ei valitse suoraan kuvaa, joka on
// tällä hetkellä valittuna

const ImageGallery = ({ currentHeroImage, startSetFile }) => {
  const [images, setImages] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [url, setUrl] = useState(null);
  const galleryList = useRef(null);

  useEffect(() => {
    console.log("useEFfetc imagegallery");
    const fetchImages = async () => {
      console.log("fetching images");
      const res = await api.getImages();
      if (res.status !== 200) return new Error("Unable to fetch images");
      setCurrentImage(res.data.files[0]);
      setUrl(res.data.url);
      setImages(res.data.files);
    };
    if (!images) fetchImages();

    return () => {
      console.log("unmounting gallery");
    };
  }, [images]);

  const scrollLeft = () => {
    galleryList.current.scrollBy(-150, 0);
  };

  const scrollRight = () => {
    galleryList.current.scrollBy(150, 0);
  };

  if (!images && !url) return <LoadingPage />;
  else {
    return (
      <div className="gallery">
        <div className="gallery__preview">
          <Image
            imageName={currentHeroImage || currentImage}
            url={url}
            className="gallery__image gallery__image--big"
          />
        </div>
        <div className="content-container--vertical gallery__list">
          <button className="button button--gray" onClick={scrollLeft}>
            {"<"}
          </button>
          <div className="gallery__list--images" ref={galleryList}>
            {images &&
              images.map((image, index) => {
                let styles;
                if (!image) return null;
                if (currentHeroImage && currentHeroImage === image) {
                  setCurrentImage({ image, index });
                  styles =
                    "gallery__image gallery__image--current gallery__image--list";
                } else styles = "gallery__image gallery__image--list";
                return (
                  <Image
                    key={index}
                    imageName={image}
                    url={url}
                    className={styles}
                    onClick={() => {
                      setCurrentImage(image);
                      startSetFile && startSetFile(image);
                    }}
                  />
                );
              })}
          </div>
          <button
            className="button button--left-margin button--gray"
            onClick={scrollRight}
          >
            {">"}
          </button>
        </div>
      </div>
    );
  }
};

export default ImageGallery;
