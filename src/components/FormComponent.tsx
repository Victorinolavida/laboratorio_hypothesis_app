import React, { FormEvent } from "react";
import { InputText } from "./InputText";

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormComponent = ({ onSubmit, onChange }: Props) => {
  const click = () => {
    console.log("hola");
  };
  return (
    <>
      {/* input url */}
      <form
        onSubmit={(e) => onSubmit(e)}
        className="buscar-form animate__animated animate__fadeInLeftBig "
      >
        <h4 className="buscar-title ">Ingresa la informacion para empezar a buscar</h4>

        {/* <label form='buscarUrl'>URL</label>
      <input type="text" name="buscarUrl" id="buscarUrl"/> */}
        <div className="formulario">
          <InputText
            name="buscarUrl"
            id="url"
            label="🌍URL"
            onChange={onChange}
            placeholder="https://ejemplo.com"
          />

          {/* input  user */}
          <InputText
            name="buscarUser"
            id="userID"
            onChange={onChange}
            label="🙍🏽‍♂️🙎🏽‍♀️USER"
            placeholder="acct:lmichan@hypothe.is"
          />

          {/* tags */}
          <InputText
            name="buscarTag"
            id="tag"
            onChange={onChange}
            label="🔖TAG"
            placeholder="biodatabases"
          />

          <InputText
            name="buscarGrupo"
            id="grupo"
            onChange={onChange}
            label="🥼ID grupo"
            placeholder="Ingresa el ID de un grupo"
          />
        </div>

        <button onClick={click} type="submit" className="btn btn-anotaciones">
          Buscar anotaciones
        </button>
      </form>
    </>
  );
};
