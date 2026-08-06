import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";
import "../styles/Login.css";

function Login() {
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogIn(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    axios
      .post("https://my-movie-crib-back.onrender.com/api/users/login", {
        email: email.value,
        password: password.value,
      })
      .then((payload) => {
        dispatch(setUser(payload.data));
        alert(`Bienvenido ${payload.data.name}!`);
        navigate("/1");
      })
      .catch(() => alert("Datos incorrectos!"));
  }

  return (
    <div>
      <form onSubmit={handleLogIn}>
        <h3 className="titulo">Ingresar</h3>
        <div className="form">
          <input
            {...email}
            className="input-form"
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
          <input
            {...password}
            className="input-form"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <button className="button is-primary">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;