import React from "react";
import ReactModal from "react-modal";

import s from "./ImageModal.module.css";
import { Image } from "../App/App.types";

// interface Image {
//   urls: {
//     regular: string;
//   };
//   alt_description?: string;
// }

interface ImageModalProps {
  image: Image;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => (
  <ReactModal isOpen onRequestClose={onClose} ariaHideApp={false}>
    <div>
      <img
        className={s.fullImage}
        src={image.urls.regular}
        alt={image.alt_description || "Image"}
      />
      <p className={s.text}>{image.alt_description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </ReactModal>
);

export default ImageModal;
