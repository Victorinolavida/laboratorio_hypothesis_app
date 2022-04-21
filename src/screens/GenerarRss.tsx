import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';


export const GenerarRss = () => {

  const [format, setFormat] = useState<string>("")
  const [parametro, setParametro] = useState<string>("")
  const [query, setQuery] = useState<string>("")

  const [rssQuery, setRssQuery] = useState<string>("")

  const dispatch = useDispatch()


const handleChanges = (e:React.ChangeEvent<HTMLSelectElement>) => {
     const {value,name} = e.target;

    if(name ==='format') setFormat(value);
    if(name==="query")  setParametro(value)
    
}

const close = ()=>{
  dispatch({type:"RSSstatus",payload:false})

}

const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
setQuery(e.target.value)

}

const onSubmit =(event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  event.preventDefault();

  if(format.length === 0 ||query.length===0 || parametro.length === 0) {

    return Swal.fire({
      title: "Error!!",
      icon: "error",
      text: "Los datos son obligatorios",
      customClass: {
        popup: "texto",
      },
    });
  }

  if(format === "atom") setRssQuery(`http://hypothes.is/stream.atom?${parametro}=${query}`)

  
  if(format === "rss") setRssQuery(`http://hypothes.is/stream.rss?${parametro}=${query}`)
  
}

 return(
   <>
   <div className='tab-rss'>

     <div className='tab-container'>

       <div className='head'>
         
       <h2 className="header-tab">
         Genera un RSS agregando los siguientes datos:
       </h2>
       <button onClick={close}>&#x274c;</button>
       </div>

        <h3 className='header-h3-tab hj1'>Con que formato quieres generarlo</h3>
       <select name="format" defaultValue={""} onChange={e => handleChanges(e)}
       className="tab-select">
        <option value="">Selecciona un formato</option>
        <option value="rss">RSS</option>
        <option value="atom">Atom</option>
      </select>

        <h3 className='header-h3-tab'>Que párametro quieres usar: </h3>


        <select name="query" defaultValue={""} onChange={e => handleChanges(e)} className="tab-select">
        <option value="">Selecciona parametro</option>
        <option value="uri">URL</option>
        <option value="tags">tags</option>
        <option value=" user">usuario</option>
      </select>

      <h3 className='header-h3-tab hj3'>Introduce el valor del parametro</h3>
        <form className='form-tab'>
          
        <input  className='tab-input' type="text" onChange={e=>handleInput(e)} />

        <button onClick={e=>onSubmit(e)} className="tab-bottom">Generar</button>
        </form>
        {
          rssQuery?<div>
            <span>El RSS es: </span> <a className='link-tab' target="_blank" href={rssQuery}>{rssQuery}</a>
          </div>:""
        }
        
     </div>
    
   </div>
   </>
 )
}
