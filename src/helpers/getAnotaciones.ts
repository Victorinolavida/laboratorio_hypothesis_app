import { URLBASE } from "../hypotesis-config/config";

export const getAnotaciones = async (
  url: string,
  user: string,
  tag: string
) => {
  const urlString: string = url ? `&uri=${url}` : "";
  const tagString: string = tag ? `&tag=${tag}` : "";

  let newUrl =
   ` ${ URLBASE }search?limit=100&user=${user} ${urlString}${tagString}`;
  newUrl.trim();



  console.log(newUrl)
  return fetch(newUrl);
};
