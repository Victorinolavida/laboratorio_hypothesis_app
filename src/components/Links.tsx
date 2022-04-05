import React from "react";

interface link {
  clase: string;
}

export const Links = ({ clase }: link) => {
  return (
    <>
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
