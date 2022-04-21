import { FormEvent, MouseEvent, useEffect } from "react";
import { getAnotaciones } from "../helpers/getAnotaciones";
import { useForm } from "../hook/useForm";
import { Bottones } from "./Bottones";
import { FormComponent } from "../components/FormComponent";
import { Annotations } from "../components/Annotations";
import { usePagination } from "../hook/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../state/store";

export interface InitialState {
  buscarUrl: string;
  buscarUser: string;
  buscarTag: string;
  buscarGrupo: string;
}

const INITIALSTATE: InitialState = {
  buscarUrl: "",
  buscarUser: "",
  buscarTag: "",
  buscarGrupo: "",
};

export const BuscarScreen = () => {
  const { token, buscar } = useSelector((store: Reducers) => store);
  const dispatch = useDispatch();
  const { anotaciones, isLoading } = buscar;

  //datos del form
  const { formData, onChange } = useForm(INITIALSTATE);

  //estado que maneja la paginacion
  const { perPage, TotalPages, startPage, setTotalPage, moverPage } = usePagination(10);

  const { buscarTag, buscarUrl, buscarUser, buscarGrupo } = formData;

  //funcion que maneja el form
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = buscarUser || token.user;
    getAnotaciones(buscarUrl, user, buscarTag, buscarGrupo, token.token).then((data) => {
      dispatch({ type: "setAnotaciones", payload: data.rows });
    });

    moverPage(-startPage);
  };

  useEffect(() => {
    if (anotaciones.length !== 0) {
      setTotalPage(anotaciones.length);
    }
  }, [anotaciones]);

  // MANEJA LOS CLICKS EN LOS BOTONES DE PAGUNACION
  const onClick = (e: MouseEvent<HTMLButtonElement> | MouseEvent) => {
    if (e.currentTarget.textContent === "sig") {
      moverPage(+1);
    }

    if (e.currentTarget.textContent === "prev") {
      moverPage(-1);
    }
  };

  return (
    <>
      {/*  COMPONENTE QUE MANEJA Y RENDERIZA EL FORM */}

      <FormComponent onChange={onChange} onSubmit={onSubmit} />

      {/* TARJETAS */}

      <Annotations
        isLoading={isLoading}
        anotaciones={anotaciones}
        startPage={startPage}
        perPage={perPage}
      />
      {isLoading ? (
        ""
      ) : (
        <Bottones
          numPages={anotaciones.length}
          numTotalPages={TotalPages}
          currentPage={startPage}
          onClick={(e) => onClick(e)}
        />
      )}
    </>
  );
};
