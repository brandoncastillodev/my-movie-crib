import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function User() {
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://my-movie-crib-back.onrender.com/api/favorites/${id}`)
      .then((fav) => {
        setFavorites(fav.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviePromises = favorites.map((fav) =>
        axios.get(
          `https://my-movie-crib-back.onrender.com/api/movies/search/${fav.movieId}`
        )
      );

      try {
        const movieResponses = await Promise.all(moviePromises);
        const movieData = movieResponses.map((response) => response.data);
        setMovies(movieData);
      } catch (error) {
        console.error(error);
      }
    };

    if (favorites.length > 0) {
      fetchMovies();
    }
  }, [favorites]);

  if (movies.length < 1)
    return (
      <>
        <h3 className="sub-titulo">Este usuario no tiene favoritos.</h3>
        <h3 style={{ fontSize: "1.7rem" }}>😵</h3>
      </>
    );
  return (
    <div>
      <h3 className="titulo">Favoritos</h3>
      <div className="all">
        <div className="movie-display-layout">
          {movies.map((movie, i) => (
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

export default User;
