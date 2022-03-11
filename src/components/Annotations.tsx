import React from 'react'
import { getAnotacion } from '../helpers/getAnotaciones'
import { TOKEN } from '../hypotesis-config/config'
import { AnotationInterface } from '../interfaces/annotations';
import { useState } from 'react';
import { ActualizarAnnotation } from './ActualizarAnnotation';
import { useForm } from '../hook/useForm';

interface Props {
    isLoading: boolean
    anotaciones: AnotationInterface[]
    startPage: number
    perPage:number
}
interface Data{
  uri:string;
  tags:string[] | [];
}

const INITALSTATE = {
  uri:'',
  tags:[]
}

export const Annotations = ({isLoading,anotaciones,startPage,perPage}:Props) => {


  const [anotacion, setAnotacion] = useState<Data>(INITALSTATE)


  const { uri,tags } = anotacion;

  

  const [ isEditing, setIsEditing] = useState(false);


  const editar= ( e:React.MouseEvent<HTMLButtonElement, MouseEvent>  ) => {
  
    console.log(e.currentTarget.id)
  
    const url = getAnotacion( e.currentTarget.id );
  
  fetch(url,{
    headers: {
      'Authorization': ` Bearer ${ TOKEN }`
    }
  }).then(resp => resp.json())
  .then(data => {
    setAnotacion({
      uri:data.uri,
      tags:data.tags,
    })
  })
  
  setIsEditing(true);

  }
  
  const eliminar= ( e:React.MouseEvent<HTMLButtonElement, MouseEvent>  ) => {
  
    console.log(e.currentTarget.id)
  
  }
  

  
  return (
    <div>

    {isEditing?(  <ActualizarAnnotation  uri={  uri }  tags={ tags }   />):''}
    {/* <ActualizarAnnotation  uri={  uri }  tags={ tags }    /> */}

    <ul className="list-group mt -5" >
    {
      !isLoading? 
      anotaciones.slice(startPage*perPage,(startPage+1)*perPage-1 ).map((el) => (
        <li key={el.id} className="list-group-item list-group-item-success p-4 m-2">
          <h2 className="h2 text-justify">LINK: {el.uri}</h2>
            <p className="text-muted">ID: {el.id}</p>
          <span className="font-weight-bold">TAGS: {el.tags.join(", ")}</span>
          <div className="mt-3">
            <button onClick={e =>  editar(e)} id={ el.id } className="btn btn-light" >Editar</button>
            <button onClick={e =>  eliminar(e)} className="btn btn-danger" id={ el.id } >Eliminar</button>
          </div>

        </li>
      )):''
    }
    </ul>
    </div>
  )
}
