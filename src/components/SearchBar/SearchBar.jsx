import toast, { Toaster } from "react-hot-toast";
import s from "./SearchBar.module.css";

import { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }
    onSubmit(input);
    setInput("");
  };
  return (
    <div className={s.formWrapper}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={s.input}
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default SearchBar;
