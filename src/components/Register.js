import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router";
import "../styles/Login.css";

function Register() {
  const email = useInput();
  const password = useInput();
  const name = useInput();
  const lastname = useInput();
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post(`https://my-movie-crib-back.onrender.com/api/users/register`, {
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
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <h3 className="titulo">Registrarse</h3>
        <div className="form">
          <input {...name} className="input-form" placeholder="Nombre" />
          <input {...lastname} className="input-form" placeholder="Apellido" />
          <input
            {...email}
            className="input-form"
            type="email"
            placeholder="Email"
          />
          <input
            {...password}
            className="input-form"
            type="password"
            placeholder="Password"
          />
          <button className="button is-primary">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
