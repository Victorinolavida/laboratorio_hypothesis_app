import { TOKEN, URLBASE } from "../hypotesis-config/config";

export interface StateCrearAnotacion {
  group: string
  uri: string
  text: string
  tags: string[]
}


export interface DataPatch {
  id:string
  uri: string
  text:string,
  tags: string[] |[]
}






export const getAnotaciones =  (
  url: string,
  user: string,
  tag: string
):string => {
  const urlString: string = url ? `&uri=${url}` : "";
  const tagString: string = tag ? `&tag=${tag}` : "";
  // let newUrl =
  //  ` ${ URLBASE }search?limit=100&user=${user}${urlString}${tagString}`;
  // newUrl.trim();



  // return fetch(newUrl);


  let URL =  `${ URLBASE }search?limit=100&user=${user}${urlString}${tagString}`;


 return URL

};


export const getAnotacion = ( id:string):string => { 

  // https://api.hypothes.is/api/annotations/{id}
 return  `${ URLBASE }annotations/${id}`
 
}



export const postAnnotation = async ( payload:StateCrearAnotacion ) => {

  const data = {
    ...payload,
    permissions: {
      read: [
     "group:__world__"
          ]},
  }
   await fetch(`${ URLBASE }annotations`, {
    method:'POST',
    headers:{
      Authorization: `Bearer ${TOKEN}`
    },
    body: JSON.stringify( data )
  })

}



export const patchAnotation = async( { id, ...data }: DataPatch ) => {

  await fetch(`${ URLBASE }annotations/${ id }`, {
    method:'PATCH',
    headers:{
      Authorization: `Bearer ${TOKEN}`
    },
    body: JSON.stringify( data )
  })

}


export const deleteAnotation = async( id: string  ) => {

  await fetch(`${ URLBASE }annotations/${ id }`, {
    method:'DELETE',
    headers:{
      Authorization: `Bearer ${TOKEN}`
    }
  })

}