import { URLBASE } from "../hypotesis-config/config";


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