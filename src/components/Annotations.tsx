import React from 'react'
import { deleteAnotation, getAnotacion } from '../helpers/getAnotaciones'
import { TOKEN } from '../hypotesis-config/config'
import { AnotationInterface } from '../interfaces/annotations';
import { ActualizarAnnotation } from './ActualizarAnnotation';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../state/store';
import Swal from 'sweetalert2'

interface Props {
    isLoading: boolean
    anotaciones: AnotationInterface[]
    startPage: number
    perPage:number
}


export const Annotations = ({isLoading,anotaciones,startPage,perPage}:Props) => {


  const { uri, tags, isEditing,text, id  } = useSelector( (store: Reducers) => store.select)
  const dispatch = useDispatch();


  const editar= ( e:React.MouseEvent<HTMLButtonElement, MouseEvent>  ) => {
    const id = e.currentTarget.id;
    const url = getAnotacion( e.currentTarget.id );
    
      fetch(url,{
        headers: {
          'Authorization': ` Bearer ${ TOKEN }`
        }
      }).then(resp => resp.json())
      .then(data => {
          dispatch({ type:"EditingAnotation",payload:{
            id,
            uri:data.uri,
            tags:data.tags,
            text: data.text
          } })
      })

  }
  
  const eliminar = async( e:React.MouseEvent<HTMLButtonElement, MouseEvent>  ) => {
    const id = e.currentTarget.id;
    const isDelete = await Swal.fire({
      title: 'Advertencia!',
      text: '¿Realmente quieres eliminar esta anotación?',
      icon: 'warning',
      confirmButtonText: 'Acceptar',
      showCancelButton:true,
      cancelButtonText:'Cancelar'
    })

    if( isDelete.isConfirmed ){
      
      deleteAnotation(id)
      Swal.fire({
        title: 'Anotacion eliminada',
        icon: 'success',
      })
    }
  
  }
  

  
  return (
    <div>

    {isEditing ? (  <ActualizarAnnotation  uri={  uri }  tags={ tags } text={ text } id={ id }  />):''}
    {/* <ActualizarAnnotation  uri={  uri }  tags={ tags }    /> */}

    <ul className="list-group mt -5" >
    {
      !isLoading? 
      anotaciones.slice(startPage*perPage,(startPage+1)*perPage-1 ).map((el) => (
        <li key={el.id} className="list-group-item list-group-item-success p-4 m-2">
          <h2 className="h2 text-justify">LINK: {el.uri}</h2>
            <p className="text-muted">ID: {el.id}</p>
          <span className="font-weight-bold">TAGS: {el.tags.join(", ")}</span>
          <br />
          <br />
          <span className="font-weight-bold ">TEXTO: {el.text}</span>
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
