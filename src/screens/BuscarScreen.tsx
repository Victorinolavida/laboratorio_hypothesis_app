import {  FormEvent, MouseEvent,useState } from "react";
// import { InputText } from "../components/InputText"
import { getAnotaciones } from "../helpers/getAnotaciones";
import { AnotationInterface } from "../interfaces/annotations";
import { useForm } from "../hook/useForm";
import { Bottones } from "./Bottones";
import { FormComponent } from "../components/FormComponent";

export interface InitialState {
  buscarUrl: string;
  buscarUser: string;
  buscarTag: string;
}

const INITIALSTATE: InitialState = {
  buscarUrl: "",
  buscarUser: "acct:lmichan@hypothes.is",
  buscarTag: "",
};


export const BuscarScreen = () => {
  //datos del form
  const { formData, onChange, setFormData } = useForm(INITIALSTATE);

  // resutlados de las busqueda sde anotaciones
  const [anotaciones, setAnotaciones] = useState<AnotationInterface[]>(  [] );
//estado que maneja la paginacion
  const [pagination, setPagination] = useState({
    perPage: 10,
    TotalPages: 1,
    start: 0,
  });

  const { perPage,  TotalPages, start } = pagination;
  const { buscarTag, buscarUrl, buscarUser } = formData;

  //funcion que maneja el form
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getAnotaciones(buscarUrl, buscarUser, buscarTag)
      .then((el) => el.json())
      .then((anotacion: { rows:AnotationInterface[],total:number  }) => {
        console.log(anotacion)
        setAnotaciones(anotacion.rows)
      });

    if (anotaciones.length !== 0) {
      setPagination((prev) => {
        return {
          ...prev,
          TotalPages: Math.ceil(anotaciones.length / prev.perPage),
        };
      });
    }
    console.log(pagination);

    setFormData(INITIALSTATE);
  };

// MANEJA LOS CLICKS EN LOS BOTONES DE PAGUNACION
  const onClick = ( e:  MouseEvent<HTMLButtonElement>|MouseEvent ) =>{
   
    console.log(typeof(e.currentTarget.textContent))
  
    if( e.currentTarget.textContent === 'sig' ){

      setPagination( prev=>{
      return {
        ...prev,
        start: Math.min(prev.start+1,TotalPages-1)
         }})
    }

    if( e.currentTarget.textContent === 'prev' ){

      setPagination( prev=>{
      return {
        ...prev,
        start: Math.max( prev.start-1,0)
         }})
    }
  
     
    
  }



  return (
    <>
     
     {/*  COMPONENTE QUE MANEJA Y RENDERIZA EL FORM */}
    <FormComponent onChange={ onChange } onSubmit={ onSubmit }/>

      {/* TARJETAS */}
      {
       
       anotaciones.slice(start*perPage,(start+1)*perPage-1 ).map((el) => (
          <li key={el.id}>
            <h2>{el.uri}</h2>
            <span>{el.tags.join(", ")}</span>
          </li>
        ))
      }

      {
      
      anotaciones.length === 0 ? '': (
         <Bottones
         numPages={ perPage }
           numTotalPages={ TotalPages }
           currentPage={  start }
           onClick = {  e => onClick(e) }
         /> )
      }

    </>
  );
};
