import React, { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          placeholder="Enter query"
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
