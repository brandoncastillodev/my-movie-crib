import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Home.css";
import Loading from "./Loading";

function Home() {
  const pagina = Number(useParams().page) || 1;
  const [movies, setMovies] = useState<TMDBMovieSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://my-movie-crib-back.onrender.com/api/movies/home/${pagina}`)
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [pagina]);

  const movieLimit = isMobile ? 14 : 15;

  return (
    <div className="home">
      <h1 className="titulo">My Movie Crib 🎬</h1>
      <div className="all">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="movie-display-layout">
              {movies.slice(0, movieLimit).map((movie, i) => (
                <div key={i} className="movie-poster">
                  <Link to={`/movies/search/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                    />
                  </Link>
                </div>
              ))}
            </div>
            {pagina > 1 && (
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to={`/${pagina - 1}`}
                className="button is-info pagination-btn"
                style={{ marginRight: "1rem" }}
              >
                Previous
              </Link>
            )}
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to={`/${pagina + 1}`}
              className="button is-primary pagination-btn"
            >
              Next
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
