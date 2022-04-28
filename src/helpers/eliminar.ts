import Swal from "sweetalert2";
import { deleteAnotation } from "./getAnotaciones";

export const deleteAsync = async (id: string, token: string) => {
  const isDelete = await Swal.fire({
    title: "Advertencia!",
    text: "¿Realmente quieres eliminar esta anotación?",
    icon: "warning",
    confirmButtonText: "Acceptar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    customClass: {
      popup: "texto",
    },
  });
  if (isDelete.isConfirmed) {
    deleteAnotation(id, token);
  }
};
