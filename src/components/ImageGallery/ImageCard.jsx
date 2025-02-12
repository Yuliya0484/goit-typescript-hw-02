import s from "./ImageGallery.module.css";
const ImageCard = ({ image, onClick }) => (
  <div className={s.imageBox} onClick={onClick}>
    <img
      className={s.image}
      src={image.urls.small}
      alt={image.alt_description}
    />
  </div>
);

export default ImageCard;
