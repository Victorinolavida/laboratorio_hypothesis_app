import { deleteAnotation, getAnotacion } from "../helpers/getAnotaciones";
import { AnotationInterface } from "../interfaces/annotations";
import { ActualizarAnnotation } from "./ActualizarAnnotation";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../state/store";
import { deleteAsync } from "../helpers/eliminar";
import Swal from "sweetalert2";

interface Props {
  isLoading: boolean;
  anotaciones: AnotationInterface[];
  startPage: number;
  perPage: number;
}

export const Annotations = ({ isLoading, anotaciones, startPage, perPage }: Props) => {
  const { uri, tags, isEditing, text, id, group } = useSelector((store: Reducers) => store.select);
  const { anotaciones: oldAnotaciones } = useSelector((store: Reducers) => store.buscar);

  const { token } = useSelector((store: Reducers) => store.token);
  const dispatch = useDispatch();

  const editar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    getAnotacion(e.currentTarget.id, token).then((anotation) =>
      dispatch({ type: "EditingAnotation", payload: anotation })
    );
  };

  const eliminar =  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.id;

    const isDelete =  Swal.fire({
      title: "Advertencia!",
      text: "¿Realmente quieres eliminar esta anotación?",
      icon: "warning",
      confirmButtonText: "Acceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "texto",
      },
    }).then( result=>{
      
      if( result.isConfirmed ){
        
        deleteAnotation(id,token)
        const newAnotaciones = oldAnotaciones.filter((note) => note.id !== id);
        dispatch({ type: "setAnotaciones", payload: newAnotaciones });
      }

    } );

    
  };

  return (
    <div>
      {isEditing && (
        <ActualizarAnnotation uri={uri} tags={tags} text={text} id={id} grupo={group} />
      )}
      {/* <ActualizarAnnotation  uri={  uri }  tags={ tags }    /> */}

      <ul className="anotacion-lista  ">
        {!isLoading
          ? anotaciones.slice(startPage * perPage, (startPage + 1) * perPage - 1).map((el) => (
              <li
                key={el.id}
                className="anotacion  animate__animated  animate__fadeIn"
                id={`anotation-${id}`}
              >
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
