import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Search() {
  const { name } = useParams();
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios
      .get(`https://my-movie-crib-back.onrender.com/api/movies/${name}`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, [name]);

  useEffect(() => {
    async function fetchData() {
      const availabilityArray = await Promise.all(
        movies.map(async (movie) => {
          try {
            const response = await fetch(
              `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            );
            return response.ok;
          } catch (error) {
            return false;
          }
        })
      );

      const filteredMovies = movies.filter(
        (_, index) => availabilityArray[index]
      );
      setFilter(filteredMovies);
    }

    fetchData();
  }, [movies]);

  if (filter.length < 1)
    return (
      <>
        <h3 className="sub-titulo">
          No se encontraron resultados para "{name}".
        </h3>
        <h3 style={{ fontSize: "1.7rem" }}>😵</h3>
      </>
    );

  return (
    <div className="home">
      <h3 className="titulo">Resultados</h3>
      <div className="all">
        <div className="movie-display-layout">
          {filter.map((movie, i) => (
            <div key={i} className="movie-poster">
              <Link to={`/movies/search/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
