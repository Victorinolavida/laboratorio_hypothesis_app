import React from 'react'
import { getAnotacion } from '../helpers/getAnotaciones'
import { TOKEN } from '../hypotesis-config/config'
import { AnotationInterface } from '../interfaces/annotations';
import { ActualizarAnnotation } from './ActualizarAnnotation';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../state/store';
import Swal from 'sweetalert2';

interface Props {
    isLoading: boolean
    anotaciones: AnotationInterface[]
    startPage: number
    perPage:number
}


export const Annotations = ({isLoading,anotaciones,startPage,perPage}:Props) => {


  const { uri, tags, isEditing  } = useSelector( (store: Reducers) => store.select)
  const dispatch = useDispatch();


  const editar= ( e:React.MouseEvent<HTMLButtonElement, MouseEvent>  ) => {

    const url = getAnotacion( e.currentTarget.id );
  
      fetch(url,{
        headers: {
          'Authorization': ` Bearer ${ TOKEN }`
        }
      }).then(resp => resp.json())
      .then(data => {
          dispatch({ type:"EditingAnotation",payload:{
            uri:data.uri,
            tags:data.tags,
          } })
      })

  }


  
  const eliminar=async ( e:React.MouseEvent<HTMLButtonElement, MouseEvent>  ) => {
    const acept =await Swal.fire({
      title: 'Advertencia!!!',
      text: '¿Estas seguro que quieres eliminar este registro?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText:'Cancelar'
    })

    console.log(acept)
  
    if( acept.isConfirmed ){
      setTimeout(()=>{
        Swal.fire({
          title: 'Registro eliminado',
          icon: 'success',
        })
      },1000)
    }

  }
  

  
  return (
    <div>

    {isEditing ? (  <ActualizarAnnotation  uri={  uri }  tags={ tags }   />):''}
    {/* <ActualizarAnnotation  uri={  uri }  tags={ tags }    /> */}

    <ul className="list-group mt -5" >
    {
      !isLoading? 
      anotaciones.slice(startPage*perPage,(startPage+1)*perPage-1 ).map((el) => (
        <li key={el.id} className="list-group-item list-group-item-success p-4 m-2 sombra ">
          <h2 className="h2 text-justify">LINK: {el.uri}</h2>
            <p className="text-muted">ID: {el.id}</p>
          <span className="font-weight-bold">TAGS: {el.tags.join(", ")}</span>
          <div className="mt-3">
            <button onClick={e =>  editar(e)} id={ el.id } className="btn btn-light" >Editar</button>
            <button onClick={e =>  eliminar(e)} className="btn btn-danger ms-3" id={ el.id } >Eliminar</button>
          </div>

        </li>
      )):''
    }
    </ul>
    </div>
  )
}
