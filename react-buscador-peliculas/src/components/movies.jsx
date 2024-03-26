/* eslint-disable react/prop-types */
function ListOfMovies({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResult() {
  return <p>No movies were found for this search</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0; //va a renderizar las movies en caso de ser true
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
}
