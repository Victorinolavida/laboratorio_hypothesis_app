import React from 'react'
import { InputText } from '../components'

export const CrearScreen = () => {
  return (
    <div className='container'>

      <form >
          <InputText name="uri" label="URL target" id="uri" placeholder='https://ejemplo.es' />
          <InputText name="text" label="Texto" id="text" placeholder='wd: https://www.wikidata.org/wiki/Q110999040' />
          <InputText name="tags" label="Tags" id="tags" placeholder='wikidata, database' />

        <button className='btn btn-outline-primary mt-3'  >Crear anotacion</button>


      </form>


    </div>
  )
}

