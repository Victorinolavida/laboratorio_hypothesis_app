import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../helpers/getAnotaciones";
import { Reducers } from "../state/store";
import Swal from "sweetalert2";
import { Footer } from "../components/";

export const Login = () => {
  const dispatch = useDispatch();

  const [token, setToken] = useState("");

  const state = useSelector((el: Reducers) => el.token);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.currentTarget.value);
  };

  const onSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (token.trim().length < 3) {
      // return Swal.fire("Error", "ingresaste un token invalido, intentalo de nuevo", "error");
      return Swal.fire({
        title: "Error!!",
        icon: "error",
        text: "Ingresaste un token invalido, intentalo de nuevo",
        customClass: {
          popup: "texto",
        },
      });
    }
    login(token)
      .then((data) => {
        if (!data.userid) throw new Error("No se puedo obtener tu usuario");
        localStorage.setItem("token-hypo", token);
        dispatch({
          type: "SetToken",
          payload: { token, user: data.userid },
        });
      })
      .catch((el) => {
        return Swal.fire({
          title: "Error!!",
          icon: "error",
          text: el.message,
          customClass: {
            popup: "texto",
          },
        });
      });
  };
  return (
    <>
      <div className="login-container animate__animated  animate__fadeIn">
        <div className="">
          <h1 className="login-titulo">Bienvenido a la aplicacion para hypothes.is</h1>
          <div className="formulario-login formulario">
            <div className="formulario-item">
              <label htmlFor="token" className="formulario-tag ">
                🔑token
              </label>
              <input
                autoComplete="false"
                onChange={(e) => onChange(e)}
                type="text"
                name="token"
                id="token"
                placeholder="Introduce tu token"
                className="input"
              />
            </div>
            <div>
              <a
                href="https://web.hypothes.is/start/"
                rel="noreferrer"
                target={"_blank"}
                className="link link-informacion"
              >
                ¿No tienes token? Generalo aqui
              </a>
            </div>
            <button onClick={(e) => onSubmit(e)} className="btn login-button ">
              Entrar
            </button>
          </div>
        </div>

        {state.isLogin ? <Redirect to="/" /> : <Redirect to="/login" />}
      </div>
      <Footer />
    </>
  );
};
