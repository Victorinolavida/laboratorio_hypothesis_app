import React, { useState } from "react";
import Swal from "sweetalert2";
import { InputText } from "../components/InputText";
import { postAnnotation } from "../helpers/getAnotaciones";

interface initalState {
  group: string;
  uri: string;
  text: string;
  tagsStr: string;
}

const INITITALSTATE: initalState = {
  group: "__world__",
  uri: "",
  text: "",
  tagsStr: "",
};

export const CrearScreen = () => {
  const [formData, setFormData] = useState<initalState>(INITITALSTATE);

  const { group, uri, text, tagsStr } = formData;

  const enviar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (uri.length === 0) {
      return Swal.fire({
        title: "Error",
        text: "El URL no puede estar vacío",
        icon: "error",
      });
    }
    const tags = tagsStr.split(",");
    console.log(tags);
    // console.log(tagsStr)
    postAnnotation({ uri, text, tags, group })
      .then((el) => {
        Swal.fire({
          title: "Anotacion creada",
          text: "La anotacion ser creo correctamente",
          icon: "success",
        });
      })
      .catch((el) =>
        Swal.fire({
          title: "Error!",
          text: "algo salio mal, intente de nuevo",
          icon: "error",
        })
      );
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();

    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // event.preventDefault();
    //  e.target.name
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <form className='form-floating mb-3"mt-5 form-control mt-5 form form-crear'>
        <h4 className="text-center header-form mt-2 mb-4">
          Inserta la información necesaria
        </h4>

        <InputText
          name="uri"
          label="🌍URL"
          id="URL"
          placeholder="https://research.bioinformatics.udel.edu/iptmnet/"
          onChange={onChange}
        />
        <InputText
          name="tagsStr"
          label="🔖 TAGS"
          id="tagsStr"
          placeholder=" wikidata, biodatabases"
          onChange={onChange}
        />
        {/* <InputText name="Texto" label="Texto" id="Texto" placeholder=' wd: https://www.wikidata.org '  onChange={onChange} /> */}

        <div className="input-group flex-nowrap mt-3">
          <label htmlFor="text" className="input-group-text ">
            📝TEXTO
          </label>
          <textarea
            onChange={(e) => onChangeTextArea(e)}
            name="text"
            id="text"
            placeholder=" wd: https://www.wikidata.org"
            className="form-control"
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-white mt-4 mb-4 "
          onClick={(e) => enviar(e)}
        >
          {" "}
          Crear nueva anotacion
        </button>
      </form>
    </div>
  );
};
