import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  label: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
}

export const InputText = ({
  name,
  label,
  id,
  placeholder,
  onChange,
  value,
}: Props) => {
  return (
    <div className="input-group flex-nowrap mt-3">
      <label htmlFor={id} className="input-group-text ">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className="form-control"
      />
    </div>
  );
};
