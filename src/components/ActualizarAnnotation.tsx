import { InputText } from "./InputText";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { patchAnotation } from "../helpers/getAnotaciones";
import { Reducers } from "../state/store";

export interface Data {
  uri: string;
  id: string;
  tags?: string[] | [];
  grupo: string;
  text: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ActualizarAnnotation = ({ uri, tags, text, id, grupo }: Data) => {
  const INITIALSTATE = {
    url: uri,
    tagsStr: tags?.join(",") || "",
    texto: text,
    group: grupo,
  };

  // const { isEditing  } = useSelector( (store: Reducers) => store.select)
  const { token } = useSelector((store: Reducers) => store);
  const dispatch = useDispatch();

  const [data, setData] = useState(INITIALSTATE);
  const { texto, url, tagsStr, group } = data;

  const onClick = () => {
    const newDate = {
      id,
      uri: url,
      text: texto,
      tags: tagsStr.split(","),
      group,
    };
    patchAnotation(newDate, token.token);

    dispatch({ type: "noEditing" });
  };

  const closeBtn = () => {
    dispatch({ type: "noEditing" });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="actualizar-anotacion-card  ">
      <div className="actualizar-anotacion-container">
        <div className="actualizar-header">
          <h4>Edita los datos correspondientes</h4>
          <button className="btn btn-cerrar " onClick={closeBtn}>
            X
          </button>
        </div>
        <form>
          <InputText name="url" label="🌍URL" id="url" value={url} onChange={(e) => onChange(e)} />

          <InputText
            name="tagsStr"
            label="🔖TAGS"
            id="tagsStr"
            value={tagsStr}
            onChange={(e) => onChange(e)}
          />

          <InputText
            name="group"
            label="🥼 grupo ID"
            id="group"
            value={group}
            onChange={(e) => onChange(e)}
          />

          <div className="formulario-item">
            <label htmlFor="text" className="formulario-tag">
              📝TEXTO
            </label>
            <textarea
              name="texto"
              id="texto"
              className="input"
              value={texto}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
        </form>

        <button onClick={onClick} className="btn btn-actualizar-nota">
          Actualizar
        </button>
      </div>
    </div>
  );
};
