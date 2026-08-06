import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function User() {
  const { id } = useParams<{ id: string }>();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [movies, setMovies] = useState<TMDBMovieSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`https://my-movie-crib-back.onrender.com/api/favorites/${id}`)
      .then((fav) => {
        setFavorites(fav.data);
        if (fav.data.length === 0) setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      const moviePromises = favorites.map((fav) =>
        axios.get(`https://my-movie-crib-back.onrender.com/api/movies/search/${fav.movieId}`)
      );
      try {
        const movieResponses = await Promise.all(moviePromises);
        const movieData = movieResponses.map((response) => response.data);
        setMovies(movieData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    if (favorites.length > 0) {
      fetchMovies();
    }
  }, [favorites]);

  if (loading) return <Loading />;

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
