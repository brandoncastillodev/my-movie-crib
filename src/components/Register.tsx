import axios from "axios";
import { useState } from "react";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Loading from "./Loading";

function Register() {
  const email = useInput();
  const password = useInput();
  const name = useInput();
  const lastname = useInput();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  function handleRegister(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://my-movie-crib-back.onrender.com/api/users/register", {
        email: email.value,
        password: password.value,
        name: name.value,
        lastname: lastname.value,
      })
      .then((user) => {
        if (user.data[1]) {
          alert("El usuario ha sido creado!");
          navigate("/users/login");
        } else if (user.data[1] === false) {
          alert("El mail ya sido utilizado!");
        } else {
          alert("Ingreso datos incorrectos!");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  if (loading) return <Loading />;

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h3 className="titulo">Registrarse</h3>
        <div className="form">
          <input {...name} className="input-form" placeholder="Nombre" autoComplete="off" />
          <input {...lastname} className="input-form" placeholder="Apellido" autoComplete="off" />
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

export default Register;
