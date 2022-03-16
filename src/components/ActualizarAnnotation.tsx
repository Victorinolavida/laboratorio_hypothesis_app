import { InputText } from "./InputText";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useState } from "react";
import { patchAnotation } from "../helpers/getAnotaciones";

export interface Data {
  uri: string;
  id: string;
  tags?: string[] | [];
  text: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ActualizarAnnotation = ({ uri, tags, text, id }: Data) => {
  const INITIALSTATE = {
    url: uri,
    tagsStr: tags?.join(",") || "",
    texto: text,
  };

  // const { isEditing  } = useSelector( (store: Reducers) => store.select)
  const dispatch = useDispatch();

  const [data, setData] = useState(INITIALSTATE);
  const { texto, url, tagsStr } = data;

  const onClick = () => {
    const newDate = {
      id,
      uri: url,
      text: texto,
      tags: tagsStr.split(","),
    };
    patchAnotation(newDate)
      .then((el) => {
        Swal.fire("Cambios guardados!", "", "success");
      })
      .catch((el) => Swal.fire("Error!", "Algo salio mal", "error"));

    dispatch({ type: "noEditing" });
  };

  const closeBtn = () => {
    dispatch({ type: "noEditing" });
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="position-fixed over card  ">
      <div className="w-50  p-5 m-auto no-opacity border border-secondary position-relative card-update">
        <h4>Edita los datos correspondientes</h4>
        <button
          className="btn btn-outline-danger position-absolute boton-cierre "
          onClick={closeBtn}
        >
          X
        </button>
        <form>
          <InputText
            name="url"
            label="URL"
            id="url"
            value={url}
            onChange={(e) => onChange(e)}
          />

          <InputText
            name="tagsStr"
            label="TAGS"
            id="tagsStr"
            value={tagsStr}
            onChange={(e) => onChange(e)}
          />

          <div className="input-group flex-nowrap mt-3">
            <label htmlFor="text" className="input-group-text ">
              Texto
            </label>
            <textarea
              name="texto"
              id="texto"
              className="form-control"
              value={texto}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
        </form>

        <button onClick={onClick} className="btn btn-outline-primary mt-4">
          Actualizar
        </button>
      </div>
    </div>
  );
};
