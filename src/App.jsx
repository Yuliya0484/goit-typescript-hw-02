import { useState } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const API_KEY = "V8Lf3HMrQev_hQ0oE91bCwgOEuF6slPv5YcvzmqFzXE";
const BASE_URL = "https://api.unsplash.com";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (searchQuery, pageNumber) => {
    setIsLoading(true);
    setError(null);

    try {
      const responce = await axios.get(`${BASE_URL}/search/photos`, {
        params: {
          query: searchQuery,
          page: pageNumber,
          per_page: 12,
          client_id: API_KEY,
        },
      });
      if (responce.data.results.length === 0) {
        toast.error("No images found for this query!");
      } else {
        setImages((prevImages) => [...prevImages, ...responce.data.results]);
      }
    } catch (error) {
      setError("Failed to fetch images. Please try again.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    fetchImages(searchQuery, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-box">
      <h1 className="title">Image Gallery</h1>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMore} />}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default App;
