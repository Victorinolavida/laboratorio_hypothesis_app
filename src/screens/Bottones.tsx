import {  MouseEvent } from "react";

interface Props {
  numPages: number;
  numTotalPages: number;
  currentPage: number;
  onClick:( e: MouseEvent<HTMLButtonElement>|MouseEvent )=>void
}

export const Bottones = ({  numTotalPages, currentPage,onClick }: Props) => {

  return (
    <div className="container mt-3 mb-2 d-flex justify-content-around ">
      <button onClick={ e=>onClick(e) } 
      className={`btn btn-outline-secondary ${ currentPage===0?'disabled':'' }`} 
      >prev</button>

      <span className="text-bold">{`${currentPage+1}/${numTotalPages}`}</span>

      <button onClick={ e=>onClick(e) } 
      className={`btn btn-outline-secondary ${ currentPage===numTotalPages-1?'disabled':'' }`} 
      >sig</button>
    </div>
  );
};
