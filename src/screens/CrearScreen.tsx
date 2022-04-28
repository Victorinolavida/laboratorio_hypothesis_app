import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { InputText } from "../components/";
import { postAnnotation } from "../helpers/getAnotaciones";
import { useSelector, useDispatch } from "react-redux";
import { Reducers } from "../state/store";
interface initalState {
  group: string;
  uri: string;
  text: string;
  tagsStr: string;
}

const INITITALSTATE: initalState = {
  uri: "",
  text: "",
  tagsStr: "",
  group: "",
};

export const CrearScreen = () => {
  const { token } = useSelector((store: Reducers) => store);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "setAnotaciones", payload: [] });
  }, []);

  const [formData, setFormData] = useState<initalState>(INITITALSTATE);

  const { group, uri, text, tagsStr } = formData;

  const enviar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (uri.length === 0) {
      return Swal.fire({
        title: "Error",
        text: "El URL no puede estar vacío",
        icon: "error",
        customClass: {
          popup: "texto",
        },
      });
    }

    const tags = tagsStr.split(",");

    if (!group) {
      postAnnotation({ uri, text, tags }, token.token);
      return;
    }

    postAnnotation({ uri, text, tags, group }, token.token);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();

    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // event.preventDefault();
    //  e.target.name
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className=" animate__animated animate__fadeInLeftBig ">
      <form className="buscar-form ">
        <h4 className="buscar-title title-crear">Inserta la información necesaria</h4>

        <InputText
          name="uri"
          label="🌍URL"
          id="URL"
          placeholder="https://research.bioinformatics.udel.edu/iptmnet/"
          onChange={onChange}
        />
        <InputText
          name="tagsStr"
          label="🔖 TAGS"
          id="tagsStr"
          placeholder=" wikidata, biodatabases"
          onChange={onChange}
        />

        {/* group */}
        <InputText
          name="group"
          label="🥼 Grupo ID"
          id="group"
          placeholder=" wikidata, biodatabases"
          onChange={onChange}
        />

        <div className="formulario-item">
          <label htmlFor="text" className="formulario-tag">
            📝TEXTO
          </label>
          <textarea
            onChange={(e) => onChangeTextArea(e)}
            name="text"
            id="text"
            placeholder=" wd: https://www.wikidata.org"
            className="input"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-crear" onClick={(e) => enviar(e)}>
          Crear nueva anotacion
        </button>
      </form>
    </div>
  );
};
