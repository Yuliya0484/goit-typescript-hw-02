import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import React from "react";

//change jsx on tsx
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
//import Image from '../ImageGallery/ImageGallery'

const API_KEY = "V8Lf3HMrQev_hQ0oE91bCwgOEuF6slPv5YcvzmqFzXE";
const BASE_URL = "https://api.unsplash.com";
import { Image } from "./App.types";

// interface Image {
//   id: string;
//   urls: { small: string; regular: string };
//   alt_description: string;
// }

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const fetchImages = async (searchQuery: string, pageNumber: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<{ results: Image[] }>(
        `${BASE_URL}/search/photos`,
        {
          params: {
            query: searchQuery,
            page: pageNumber,
            per_page: 12,
            client_id: API_KEY,
          },
        }
      );

      if (response.data.results.length === 0) {
        toast.error("No images found for this query!");
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.results]);
      }
    } catch (error) {
      setError("Failed to fetch images. Please try again.");
      console.log("Error fetching images", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
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

  const openModal = (image: Image) => {
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
