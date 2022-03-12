import {  FormEvent, MouseEvent,useEffect } from "react";
// import { InputText } from "../components/InputText"
import { getAnotaciones } from "../helpers/getAnotaciones";
import { useForm } from "../hook/useForm";
import { Bottones } from "./Bottones";
import { FormComponent } from "../components/FormComponent";
import { Annotations } from "../components/Annotations";
import { usePagination } from '../hook/usePagination';
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from '../state/store';


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
  const { formData, onChange } = useForm(INITIALSTATE);

//estado que maneja la paginacion
  const { perPage, TotalPages, startPage, setTotalPage, moverPage } = usePagination(10)

  
  const { anotaciones, isLoading } = useSelector( (store: Reducers) => store.buscar)
  const dispatch = useDispatch();

  const { buscarTag, buscarUrl, buscarUser } = formData;

  //funcion que maneja el form
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = getAnotaciones(buscarUrl, buscarUser, buscarTag)
     fetch( url )
       .then( res => res.json() )
       .then( data => {
          // Pone las anotaciones en el estado
             dispatch({ type:"setAnotaciones",payload: data.rows })
       })
  
    moverPage(0);

  };

  useEffect(() => {
    
    if(anotaciones.length !==0){
      setTotalPage( anotaciones.length );
    }

  }, [ anotaciones])
  

// MANEJA LOS CLICKS EN LOS BOTONES DE PAGUNACION
  const onClick = ( e:  MouseEvent<HTMLButtonElement>|MouseEvent ) =>{
    if( e.currentTarget.textContent === 'sig' ){
         moverPage(+1)
    }

    if( e.currentTarget.textContent === 'prev' ){
         moverPage(-1)
    }
  }



  return (
    <>
     
     {/*  COMPONENTE QUE MANEJA Y RENDERIZA EL FORM */}
    <FormComponent onChange={ onChange } onSubmit={ onSubmit }/>

      {/* TARJETAS */}
    
   <Annotations 
      isLoading={ isLoading}
      anotaciones={ anotaciones }
      startPage={startPage }
      perPage={perPage}
       />
      {
         isLoading? '': (
         <Bottones
         numPages={ perPage }
           numTotalPages={ TotalPages }
           currentPage={  startPage }
           onClick = {  e => onClick(e) }
         /> )
      } 

    </>
  );
};
