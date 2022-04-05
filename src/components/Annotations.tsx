import React from "react";
import { deleteAnotation, getAnotacion } from "../helpers/getAnotaciones";
import { TOKEN } from "../hypotesis-config/config";
import { AnotationInterface } from "../interfaces/annotations";
import { ActualizarAnnotation } from "./ActualizarAnnotation";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../state/store";
import Swal from "sweetalert2";

interface Props {
  isLoading: boolean;
  anotaciones: AnotationInterface[];
  startPage: number;
  perPage: number;
}

export const Annotations = ({ isLoading, anotaciones, startPage, perPage }: Props) => {
  const { uri, tags, isEditing, text, id, group } = useSelector((store: Reducers) => store.select);
  const { token } = useSelector((store: Reducers) => store.token);
  const dispatch = useDispatch();

  const editar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    const url = getAnotacion(e.currentTarget.id);

    fetch(url, {
      headers: {
        Authorization: ` Bearer ${TOKEN}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({
          type: "EditingAnotation",
          payload: {
            id,
            uri: data.uri,
            tags: data.tags,
            text: data.text,
            group: data.group,
          },
        });
      });
  };

  const eliminar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    const isDelete = await Swal.fire({
      title: "Advertencia!",
      text: "¿Realmente quieres eliminar esta anotación?",
      icon: "warning",
      confirmButtonText: "Acceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "texto",
      },
    });
    console.log(id);
    if (isDelete.isConfirmed) {
      deleteAnotation(id, token);
      Swal.fire({
        title: "Anotacion eliminada",
        icon: "success",
        customClass: {
          popup: "texto",
        },
      });
    }
  };

  return (
    <div>
      {isEditing ? (
        <ActualizarAnnotation uri={uri} tags={tags} text={text} id={id} grupo={group} />
      ) : (
        ""
      )}
      {/* <ActualizarAnnotation  uri={  uri }  tags={ tags }    /> */}

      <ul className="anotacion-lista  ">
        {!isLoading
          ? anotaciones.slice(startPage * perPage, (startPage + 1) * perPage - 1).map((el) => (
              <li key={el.id} className="anotacion  animate__animated  animate__fadeIn">
                <h3 className="anotacion-url">
                  <span>🌍URL:</span> {el.uri}
                </h3>
                <p className="anotacion-etiqueta id">
                  <span>📌ID: </span> {el.id}
                </p>
                <p className="anotacion-etiqueta">
                  <span>🔖 TAGS: </span>
                  {el.tags.join(", ")}
                </p>
                <p className="notacion-etiqueta grupo">
                  <span>📝TEXTO: </span> {el.text}
                </p>

                <p className="notacion-etiqueta grupo">
                  <span>🥼 ID grupo: </span> {el.group}
                </p>
                <div className="anoracion-botones">
                  <button
                    onClick={(e) => editar(e)}
                    id={el.id}
                    className="btn btn-anotacion editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => eliminar(e)}
                    className="btn btn-anotacion eliminar"
                    id={el.id}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};
