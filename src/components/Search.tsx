import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

function Search() {
  const { name } = useParams<{ name: string }>();
  const [movies, setMovies] = useState<TMDBMovieSummary[]>([]);
  const [filter, setFilter] = useState<TMDBMovieSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    axios
      .get(`https://my-movie-crib-back.onrender.com/api/movies/${name}`)
      .then((res) => {
        setMovies(res.data);
        if (res.data.length === 0) setLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
        setLoading(false);
      });
  }, [name]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
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
      setLoading(false);
    }
    if (movies.length > 0) {
      fetchData();
    }
  }, [movies]);

  if (loading) return <Loading />;

  if (filter.length < 1)
    return (
      <>
        <h3 className="sub-titulo">
          No se encontraron resultados para &quot;{name}&quot;.
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
