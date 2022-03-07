import {  MouseEvent } from "react";

interface Props {
  numPages: number;
  numTotalPages: number;
  currentPage: number;
  onClick:( e: MouseEvent<HTMLButtonElement>|MouseEvent )=>void
}

export const Bottones = ({  numTotalPages, currentPage,onClick }: Props) => {
  return (
    <div className="container mt-5">
      <button onClick={ e=>onClick(e) } className='btn btn-outline-secondary' >prev</button>

      <span>{`${currentPage}/${numTotalPages}`}</span>

      <button onClick={ e=>onClick(e) } className='btn btn-outline-secondary' >sig</button>
    </div>
  );
};
