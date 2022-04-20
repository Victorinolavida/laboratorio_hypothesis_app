import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../state/store";


interface link {
  clase: string;
}

export const Links = ({ clase }: link) => {

  const state = useSelector((el: Reducers) => el.token);

  const dispatch = useDispatch()

const onClick = (e:React.MouseEvent<HTMLLIElement, MouseEvent>)=>{
  e.preventDefault()
  dispatch({type:"RSSstatus",payload:true})

}


  return (
    <>
    <li onClick={(e)=>onClick(e)}>
      <a href="#" className={clase }>Generar RSS</a>
    </li>
      <li>
        <a
          href="https://jonudell.info/h/tools.html"
          target="_blank"
          rel="noreferrer"
          className={clase}
        >
          Hypothesis tools
        </a>
      </li>
      <li>
        <a
          href="https://jonudell.info/h/facet/?max=50"
          target="_blank"
          rel="noreferrer"
          className={clase}
        >
          Hypothesis annotations
        </a>
      </li>
      <li>
        <a
          href="https://jonudell.info/h/TagRename/"
          target="_blank"
          rel="noreferrer"
          className={clase}
        >
          Rename Hypothesis tags
        </a>
      </li>
      <li>
        <a href="https://hypothes.is/stream" target="_blank" rel="noreferrer" className={clase}>
          Hypothesis stream
        </a>
      </li>

 
    </>
  );
};
