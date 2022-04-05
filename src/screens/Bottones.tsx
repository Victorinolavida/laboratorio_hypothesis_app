import { MouseEvent } from "react";

interface Props {
  numPages: number;
  numTotalPages: number;
  currentPage: number;
  onClick: (e: MouseEvent<HTMLButtonElement> | MouseEvent) => void;
}

export const Bottones = ({ numPages, numTotalPages, currentPage, onClick }: Props) => {
  const isCero = numPages === 0;

  return (
    <>
      {isCero ? (
        ""
      ) : (
        <div className="buscar-btn-page ">
          <button
            onClick={(e) => onClick(e)}
            className={`btn btn-page ${currentPage === 0 ? "disabled" : ""} shadow `}
          >
            prev
          </button>

          <span>{`${currentPage + 1} / ${numTotalPages}`}</span>

          <button
            onClick={(e) => onClick(e)}
            className={`btn btn-page ${currentPage === numTotalPages - 1 ? "disabled" : ""} shadow`}
          >
            sig
          </button>
        </div>
      )}
    </>
  );
};
