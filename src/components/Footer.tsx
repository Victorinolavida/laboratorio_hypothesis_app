import React from "react";
import { Links } from "./Links";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="link-container-contacto">
        <h3 className="contacto-header">Información adicional</h3>
        <a
          href="https://github.com/Victorinolavida/laboratorio_bio"
          target={"_blank"}
          rel="noreferrer"
          className="link-contacto"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="Logo de Github"
            className="logo"
          />
          <span className="link-contacto-label">Repositiorio en Github</span>
        </a>
        <a
          href="https://twitter.com/infovestigacion"
          target={"_blank"}
          rel="noreferrer"
          className="link-contacto"
        >
          <img
            src="https://w7.pngwing.com/pngs/529/867/png-transparent-computer-icons-logo-twitter-miscellaneous-blue-logo-thumbnail.png"
            alt="Logo de Github"
            className="logo"
          />
          <span className="link-contacto-label">Laboratorio de Bioinformación</span>
        </a>
      </div>

      <div className="container-links-hypotesis">
        <h3 className="container-hypotesis-title">Otras aplicaciones de hypothes.is </h3>
        <ul className="container-list">
          <Links clase="link link-login" />
        </ul>
      </div>
    </footer>
  );
};
