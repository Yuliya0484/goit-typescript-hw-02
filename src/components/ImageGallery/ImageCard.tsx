import React from "react";

import s from "./ImageGallery.module.css";
import { Image } from "../App/App.types";

// interface Image {
//   urls: {
//     small: string;
//   };
//   alt_description?: string;
// }

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => (
  <div className={s.imageBox} onClick={onClick}>
    <img
      className={s.image}
      src={image.urls.small}
      alt={image.alt_description || "Image"}
    />
  </div>
);

export default ImageCard;
