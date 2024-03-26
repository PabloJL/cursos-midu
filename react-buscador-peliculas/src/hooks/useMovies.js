import { useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const movies = await searchMovies({ search });
    setMovies(movies);
  };

  return { movies, getMovies };
}
