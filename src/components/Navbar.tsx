import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Links } from "./Links";

export const Navbar = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    localStorage.removeItem("token-hypo");
    dispatch({ type: "Salir" });
    dispatch({ type: "setAnotaciones", payload: [] });
  };

  const [mostrando, setMostrando] = useState(true);

  const showList = () => {
    setMostrando(!mostrando);
  };

  return (
    <>
      <nav className="nav ">
        <div className="nav-title">
          <h1 className=" animate__animated animate__pulse">
            <a
              href="https://sites.google.com/a/ciencias.unam.mx/layla-michan/Home"
              target={"_blank"}
              rel="noreferrer"
            >
              <span className="titulo"> Laboratorio de Bioinformación</span>
            </a>
          </h1>
        </div>
        <ul className="nav-container-link">
          <li className="nav-link">
            <NavLink exact to="/" className="nav-link" activeClassName="link-active">
              Buscar Anotaciones
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/crear" className="nav-link" activeClassName="link-active">
              Crear Anotaciones
            </NavLink>
          </li>
          <li className="nav-link">
            <div className="herramientas-btn">
              <span className={`btn btn-nav ${!mostrando ? "clicked" : ""}`} onClick={showList}>
                Otras herramientas
              </span>
              {/* animate__animated animate__backInDown */}
              <div className="over  ">
                <ul className={`herramientas  ${mostrando ? "show" : ""} `}>
                  <Links clase="link-herramienta" />
                </ul>
              </div>
            </div>
          </li>
          <li className="nav-link">
            <span className="btn btn-nav btn-salir " onClick={onClick}>
              Salir
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};
