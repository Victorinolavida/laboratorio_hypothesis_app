import { MouseEvent } from "react";

interface Props {
  numPages: number;
  numTotalPages: number;
  currentPage: number;
  onClick: (e: MouseEvent<HTMLButtonElement> | MouseEvent) => void;
}

export const Bottones = ({
  numPages,
  numTotalPages,
  currentPage,
  onClick,
}: Props) => {
  const isCero = numPages === 0;

  return (
    <>
      {isCero ? (
        ""
      ) : (
        <div className="container mt-4 mb-5 d-flex justify-content-around ">
          <button
            onClick={(e) => onClick(e)}
            className={`btn btn-outline-secondary ${
              currentPage === 0 ? "disabled" : ""
            } shadow `}
          >
            prev
          </button>

          <span className="text-bold h3">{`${
            currentPage + 1
          } / ${numTotalPages}`}</span>

          <button
            onClick={(e) => onClick(e)}
            className={`btn btn-outline-secondary ${
              currentPage === numTotalPages - 1 ? "disabled" : ""
            } shadow`}
          >
            sig
          </button>
        </div>
      )}
    </>
  );
};
