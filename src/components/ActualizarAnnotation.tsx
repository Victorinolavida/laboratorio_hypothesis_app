import { InputText } from "./InputText"
import { useForm } from '../hook/useForm';
import { useDispatch, } from "react-redux";
import Swal from 'sweetalert2'


interface Data{
  uri:string,
  tags?:string[] |[]; 
  onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void
}




export const ActualizarAnnotation = ( { uri ,tags }:Data ) => {


  // const { isEditing  } = useSelector( (store: Reducers) => store.select)
  const dispatch = useDispatch();
  
  const {formData, onChange, } = useForm({
    uri,
    tags
  })

  const onClick = () => {
    
    // falta poner le fetch
    console.log( formData,'falta fetch'  )
    dispatch({ type:"noEditing" })

    Swal.fire({
      title: 'Registro eliminado',
      icon: 'success',
    })

  }


  const closeBtn = () =>{

    dispatch({ type:"noEditing" })

  }




  return (
    <div className="position-fixed over card  ">
      
      <div className="w-50 bg-light p-5 m-auto no-opacity border border-secondary position-relative">

      <button className="btn btn-outline-danger position-absolute boton-cierre "
        onClick={ closeBtn }
      >X</button>

      <InputText name="URL" label="URL" id="mod-URL"  defaultValue={ uri } onChange={ onChange } />

      <InputText name="TAGS" label="TAGS" id="mod-TAGS"  defaultValue={ tags?.join(',') } onChange={ onChange } />

      <button  onClick={ onClick } className="btn btn-outline-secondary mt-4">Actualizar</button>

      </div>

    
    
    </div>
  )
}
