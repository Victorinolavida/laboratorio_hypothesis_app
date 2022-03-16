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
        className="form-control mt-5 mb-4 form"
      >
        <h4 className="mt-2 mb-4 text-center header-form ">
          Ingresa la informacion para empezar a buscar
        </h4>

        {/* <label form='buscarUrl'>URL</label>
      <input type="text" name="buscarUrl" id="buscarUrl"/> */}

        <InputText
          name="buscarUrl"
          id="url"
          label="🌍URL"
          onChange={onChange}
          placeholder="https://ejemplo.com"
        />

        <br />

        {/* input  user */}
        <InputText
          name="buscarUser"
          id="userID"
          onChange={onChange}
          label="🙍🏽‍♂️🙎🏽‍♀️USER"
          placeholder="acct:lmichan@hypothe.is"
        />

        <br />

        {/* tags */}
        <InputText
          name="buscarTag"
          id="tag"
          onChange={onChange}
          label="🔖TAG"
          placeholder="biodatabases"
        />

        <br />
        <button onClick={click} type="submit" className="btn btn-primary mb-3">
          Buscar anotaciones
        </button>
      </form>
    </>
  );
};
