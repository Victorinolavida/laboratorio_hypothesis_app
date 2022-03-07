import React, { FormEvent } from 'react'
import { InputText } from './InputText'


interface Props {
    onSubmit: ( e:FormEvent<HTMLFormElement> )=>void
    onChange: (event: React.ChangeEvent<HTMLInputElement> )=>void;
}

export const FormComponent = ({ onSubmit ,onChange  }: Props ) => {
  return (
    <>
  
     {/* input url */}
     <form onSubmit={(e) => onSubmit(e)} className='form-control mt-5'>
        {/* <label form='buscarUrl'>URL</label>
      <input type="text" name="buscarUrl" id="buscarUrl"/> */}

        <InputText
          name="buscarUrl"
          id="url"
          label="url"
          onChange={onChange}
          placeholder="https://ejemplo.com"
        />

        <br />

        {/* input  user */}
        <InputText
          name="buscarUser"
          id="userID"
          onChange={onChange}
          label="usuario"
          placeholder="acct:lmichan@hypothe.is"
        />

        <br />

        {/* tags */}
        <InputText
          name="buscarTag"
          id="tag"
          onChange={onChange}
          label="Tag"
          placeholder="biodatabases"
        />

        <br />
        <button type="submit" className='btn btn-primary mb-3'>Buscar</button>
      </form>

    
    </>
  )
}
