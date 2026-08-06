import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import Loading from "./Loading";

function Pelicula() {
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state: RootState) => state.user.id);
  const [like, setLike] = useState<boolean>(false);
  const [movie, setMovie] = useState<TMDBMovieDetail>({} as TMDBMovieDetail);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`https://my-movie-crib-back.onrender.com/api/movies/search/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!movie.id) return;
    axios
      .get("https://my-movie-crib-back.onrender.com/api/favorites/find", {
        params: { mid: movie.id, uid },
      })
      .then((fav) => {
        if (fav.data.movieId) setLike(true);
        else setLike(false);
      })
      .catch((err) => console.log(err));
  }, [uid, movie]);

  function handleLike(mid: number): void {
    axios
      .post("https://my-movie-crib-back.onrender.com/api/favorites/register", {
        data: { mid, uid },
      })
      .then((add) => {
        if (!uid) alert("Necesitas estar logueado");
        else if (add.data) {
          alert("Likeado!");
          setLike(true);
        } else alert("La propiedad ya esta en favoritos.");
      });
  }

  function handleDislike(mid: number): void {
    axios
      .delete("https://my-movie-crib-back.onrender.com/api/favorites/delete", {
        data: { mid, uid },
      })
      .then((del) => {
        if (del.data === "OK") {
          alert("Dislikeado!");
          setLike(false);
        }
      })
      .catch((del) => {
        if (del.code === "ERR_BAD_REQUEST") {
          return alert("La propiedad no esta en favoritos.");
        }
      });
  }

  if (loading) return <Loading />;

  if (!movie.id) return <h3>No hay datos</h3>;

  return (
    <div className="container movie-detail" style={{ marginTop: "1rem" }}>
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="column">
          <p className="title is-4">{movie.title}</p>
          <p className="content" style={{ wordBreak: "break-word" }}>
            {movie.overview}
          </p>
          <p className="subtitle is-6">
            Genre: {movie.genres[0]?.name || "unspecified"}
          </p>
          <p className="subtitle is-6">Duration: {movie.runtime}min</p>
          <p className="subtitle is-6">Release Data: {movie.release_date}</p>
          {movie.homepage ? (
            <p className="subtitle is-6" style={{ wordBreak: "break-word" }}>
              Official Site:{" "}
              <a target="_blank" rel="noreferrer" href={movie.homepage}>
                {movie.homepage}
              </a>
            </p>
          ) : null}
          {uid ? (
            like ? (
              <button
                onClick={() => handleDislike(movie.id)}
                className="button is-info"
              >
                Disike!
              </button>
            ) : (
              <button
                onClick={() => handleLike(movie.id)}
                className="button is-primary"
              >
                Like!
              </button>
            )
          ) : null}
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .movie-detail .column.is-one-quarter { text-align: center; }
          .movie-detail .column.is-one-quarter img { max-width: 200px; }
        }
      `}</style>
    </div>
  );
}

export default Pelicula;
