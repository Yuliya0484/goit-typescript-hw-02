import ReactModal from "react-modal";
import s from "./ImageModal.module.css";

const ImageModal = ({ image, onClose }) => (
  <ReactModal isOpen onRequestClose={onClose} ariaHideApp={false}>
    <div>
      <img
        className={s.fullImage}
        src={image.urls.regular}
        alt={image.alt_description}
      />
      <p className={s.text}>{image.alt_description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </ReactModal>
);

export default ImageModal;
