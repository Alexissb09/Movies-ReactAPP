import { useState, useEffect } from "react";
import { Movie } from "./components/Movie";

const API_KEY = "37896bd7a3cfef35062bed163a6bfb9b";

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;

const SEARCH_API = `
https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(FEATURED_API)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
        });
    }
    setSearchTerm("");
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            className="search"
            type="search"
            placeholder="Search... "
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-list">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
