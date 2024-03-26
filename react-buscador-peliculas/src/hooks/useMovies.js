import responseMovies from "../mocks/with-results.json";
// import withoutResults from "./mocks/no-results.json";

export function useMovies() {
  const movies = responseMovies.Search; //Tiene la respuesta de search

  //si llegamos a cambiar de api esto nos ayudara a no tener que cambiar el nombre en cada componente
  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));

  return { movies: mappedMovies };
}
