import React from "react";

import ImageCard from "./ImageCard";
import s from "./ImageGallery.module.css";
import { Image } from "../App/App.types";

// interface Image {
//   id: string;
//   urls: {
//     small: string;
//   };
//   alt_description?: string;
// }

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={s.list}>
      {images.map((image) => (
        <li className={s.card} key={image.id}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
