import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/user";
import { toggleTheme } from "../state/theme";
import type { RootState } from "../state/store";
import "../styles/Navbar.css";

function Navbar() {
  const user = useSelector((state: RootState) => state.user);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function handleLogout(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const initialState: UserState = { name: null, lastname: null, email: null, id: null };
    axios
      .post("https://my-movie-crib-back.onrender.com/api/users/logout")
      .then(() => {
        dispatch(setUser(initialState));
        alert("Salió!");
        navigate("/1");
      })
      .catch((err) => {
        console.log("error: ", err);
        alert("Lo lamento, ocurrio un error!");
        navigate("/1");
      });
  }

  useEffect(() => {
    axios
      .get("https://my-movie-crib-back.onrender.com/api/users/me")
      .then((cok) => dispatch(setUser(cok.data)))
      .catch(() => {});
  }, [dispatch]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    navigate(`/movies/${search}`);
    setSearch("");
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={"/1"}>
          <div className="logo">
            <img src="/real_logo.ico" alt="logo" />
          </div>
          <p>My Movie Crib</p>
        </Link>
        <button
          className={`navbar-burger ${menuOpen ? "is-active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className={`search-bar ${menuOpen ? "is-active" : ""}`}>
        <form onSubmit={handleSearch}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="input"
            type="text"
            placeholder="Buscar pelicula"
            autoComplete="off"
          />
        </form>
      </div>
      <div className={`navbar-end ${menuOpen ? "is-active" : ""}`}>
        <div className="navbar-item">
          <div className="buttons">
            {user.name ? (
              <div>
                <Link to={`/users/${user.id}`}>
                  <p className="button is-primary botonUser">
                    <strong>{user.name}</strong>
                  </p>
                </Link>
                <button onClick={handleLogout as any} className="button is-light botonUser">
                  Log out
                </button>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="button is-light botonUser"
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </div>
            ) : (
              <div className="navbar-botones">
                <Link to={"/users/register"}>
                  <p className="button is-primary botonUser">
                    <strong>Register</strong>
                  </p>
                </Link>
                <Link to={"/users/login"}>
                  <p className="button is-light botonUser">Log in</p>
                </Link>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="button is-light botonUser"
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;