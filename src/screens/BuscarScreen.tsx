import {  FormEvent, MouseEvent,useEffect,useState } from "react";
// import { InputText } from "../components/InputText"
import { getAnotaciones } from "../helpers/getAnotaciones";
import { AnotationInterface } from "../interfaces/annotations";
import { useForm } from "../hook/useForm";
import { Bottones } from "./Bottones";
import { FormComponent } from "../components/FormComponent";
import { Annotations } from "../components/Annotations";
import { usePagination } from '../hook/usePagination';


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

//las anotaciones han sido cargadas
const [isLoading, setIsLoading] = useState(true);

  //datos del form
  const { formData, onChange } = useForm(INITIALSTATE);

  // resutlados de las busqueda sde anotaciones
  const [anotaciones, setAnotaciones] = useState<AnotationInterface[]>(  [] );

//estado que maneja la paginacion
  const { perPage, TotalPages, startPage, setTotalPage, moverPage } = usePagination(10)

  
  const { buscarTag, buscarUrl, buscarUser } = formData;

  //funcion que maneja el form
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  const url = getAnotaciones(buscarUrl, buscarUser, buscarTag)
     fetch( url )
    .then( res => res.json() )
    .then( data => {
      setAnotaciones( data.rows )
      setIsLoading(false)
    })
  
  //limpiando info
    // setFormData(INITIALSTATE);
    moverPage(0);
    // setAnotaciones([]);

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
