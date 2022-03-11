import { useState } from "react";

//T es del tipo de dato que recive el useForm desde RegisterPage

export const useForm = <T>(initState: T) => {
  const [formData, setFormData] = useState(initState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));


  };

  return {
    //properties
    // ...formData,
    formData,

    //Methods
    onChange,
    setFormData,
  };
};
