import Swal from "sweetalert2";

export const URLBASE = "https://api.hypothes.is/api/";

export const TOKEN = "";

export interface StateCrearAnotacion {
  group?: string;
  uri: string;
  text: string;
  tags: string[];
}

export interface DataPatch {
  id: string;
  uri: string;
  text: string;
  tags: string[] | [];
}

export const getAnotaciones = async (
  url: string,
  user: string,
  tag: string,
  grupo: string,
  token: string
) => {
  const urlString: string = url ? `&uri=${url}` : "";
  const tagString: string = tag ? `&tag=${tag}` : "";
  const grupoString: string = grupo ? `&group=${grupo}` : "";

  let URL = `${URLBASE}search?limit=100&user=${user}${urlString}${tagString}${grupoString}`;
  try {
    const rep = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await rep.json();
    return data;
  } catch (error) {
    console.error(error);
    return Swal.fire({
      title: "Error!!",
      icon: "error",
      text: "Algo salio mal",
      customClass: {
        popup: "texto",
      },
    });
  }
};

export const getAnotacion = (id: string): string => {
  return `${URLBASE}annotations/${id}`;
};

export const postAnnotation = async (payload: StateCrearAnotacion, token: string) => {
  const data = {
    ...payload,
    permissions: {
      read: ["group:__world__"],
    },
  };
  try {
    const resp = await fetch(`https://api.hypothes.is/api/annotations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await resp.json();

    if (result?.status === "failure") {
      // return Swal.fire({
      //   title: "Error!!!",
      //   text: result.reason,
      //   icon: "error",
      // });
      return Swal.fire({
        title: "Error!!",
        icon: "error",
        text: result.reason,
        customClass: {
          popup: "texto",
        },
      });
    }
    return Swal.fire({
      title: "Anotacion creada",
      icon: "success",
      text: "La anotacion se creo correctamente",
      customClass: {
        popup: "texto",
      },
    });
    // return Swal.fire({
    //   title: "Anotacion creada",
    //   text: "La anotacion se creo correctamente",
    //   icon: "success",
    // });
  } catch (error) {
    return Swal.fire({
      title: "Error!!",
      icon: "error",
      text: "algo salio mal, intente de nuevo",
      customClass: {
        popup: "texto",
      },
    });
  }
};

export const patchAnotation = async ({ id, ...data }: DataPatch, token: string) => {
  try {
    await fetch(`${URLBASE}annotations/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    // return Swal.fire("Cambios guardados!", "", "success");
    return Swal.fire({
      title: "Cambios guardados correctamente",
      icon: "success",
      customClass: {
        popup: "texto",
      },
    });
  } catch (error) {
    console.log(error);
    // return Swal.fire("error!", "Algo salio mal ", "error");
    return Swal.fire({
      title: "Error!!",
      icon: "error",
      text: "algo salio mal, intente de nuevo",
      customClass: {
        popup: "texto",
      },
    });
  }
};

export const deleteAnotation = async (id: string, token: string) => {
  try {
    const resp = await fetch(`${URLBASE}annotations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await resp.json();

    if (results?.status === "failure") {
      // return Swal.fire({
      //   title: "Error!!!",
      //   text: results.reason,
      //   icon: "error",
      // });
      return Swal.fire({
        title: "Error!!",
        icon: "error",
        text: results.reason,
        customClass: {
          popup: "texto",
        },
      });
    }

    return Swal.fire({
      title: "Anotacion creada",
      text: "La anotacion se creo correctamente",
      icon: "success",
      customClass: {
        popup: "texto",
      },
    });
  } catch (error) {
    console.log(error);
    return Swal.fire({
      title: "Algo salio mal",
      icon: "error",
      customClass: {
        popup: "texto",
      },
    });
  }
};

export const login = async (token: string) => {
  try {
    const resp = await fetch(`https://api.hypothes.is/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await resp.json();

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Algo salio mal");
  }
};
