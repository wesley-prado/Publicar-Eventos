import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './evento-card.css';

import firebase from '../../config/firebase';

function EventoCard({ id, img, titulo, descricao, visualizacoes }) {
  const [urlImagem, setUrlImagem] = useState();

  useEffect(() => {
    firebase
      .storage()
      .ref(`imagens/${img}`)
      .getDownloadURL()
      .then(url => setUrlImagem(url));
  });
  return (
    <div className="full-card mt-3 col-lg-3 col-md-4 col-sm-12">
      <img
        src={urlImagem}
        className="card-img-top img-cartao"
        alt="Imagem do Evento"
      ></img>

      <div className="card-body">
        <h5>{titulo}</h5>
        <p className="card-text text-justify">{descricao}</p>

        <div className="row rodape-card d-flex align-items-center">
          <div className="col-6">
            <Link
              to={`/detalhesevento/${id}`}
              className="btn btn-sm btn-detalhes"
            >
              + Detalhes
            </Link>
          </div>

          <div className="col-6 text-right">
            <i className="fas fa-eye mr-2"></i>
            <span>{visualizacoes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventoCard;
