import { InputText } from "./InputText"
import { useForm } from '../hook/useForm';


interface Data{
  uri:string,
  tags:string[];
  onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void
}


export const ActualizarAnnotation = ( { uri ,tags }:Data ) => {
  
  const {formData, onChange, } = useForm({
    uri,
    tags
  })

  const onClick = () => {

    console.log(formData)


  }



  return (
    <div className="position-fixed over card  ">
      
      <div className="w-50 bg-light p-5 m-auto no-opacity  border border-secondary">

      <InputText name="URL" label="URL" id="mod-URL"  defaultValue={ uri } onChange={ onChange } />

      <InputText name="TAGS" label="TAGS" id="mod-TAGS"  defaultValue={ tags.join(',') } onChange={ onChange } />

      <button  onClick={ onClick } className="btn btn-outline-secondary mt-4">Actualizar</button>

      </div>

    
    
    </div>
  )
}
