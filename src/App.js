import { Route, Routes } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Pelicula from "./components/Pelicula";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import Search from "./components/Search";
import Footer from "./components/Footer";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className={`app-container${darkMode ? " dark-mode" : ""}`}>
      <Analytics />
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/:page"} element={<Home />} />
          <Route path={"movies/search/:id"} element={<Pelicula />} />
          <Route path={"movies/:name"} element={<Search />} />
          <Route path={"users/register"} element={<Register />} />
          <Route path={"users/login"} element={<Login />} />
          <Route path={"users/:id"} element={<User />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
