import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './home.css';

import firebase from '../../config/firebase';

import Navbar from '../../components/navbar/';
import EventoCard from '../../components/evento-card';

function Home({ match }) {
  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  let listaEventos = [];
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  useEffect(() => {
    if (match.params.parametro) {
      firebase
        .firestore()
        .collection('eventos')
        .where('usuario', '==', usuarioEmail)
        .get()
        .then(resultado => {
          resultado.docs.forEach(doc => {
            if (
              doc.data().titulo.indexOf(pesquisa.charAt(0).toUpperCase()) >= 0
            ) {
              listaEventos.push({
                id: doc.id,
                ...doc.data()
              });
            }
          });
          setEventos(listaEventos);
        });
    } else {
      firebase
        .firestore()
        .collection('eventos')
        .get()
        .then(resultado => {
          resultado.docs.forEach(doc => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listaEventos.push({
                id: doc.id,
                ...doc.data()
              });
            }
          });
          setEventos(listaEventos);
        });
    }
  }, [pesquisa]);
  return (
    <>
      <Navbar />
      <div className="row p-5">
        <h2 className="mx-auto pb-3">Eventos Publicados</h2>
        <input
          onChange={e => setPesquisa(e.target.value)}
          type="text"
          className="form-control text-center"
          placeholder="Pesquisar evento"
        ></input>
      </div>
      <div className="row p-4">
        {eventos.map(item => (
          <EventoCard
            id={item.id}
            img={item.foto}
            titulo={item.titulo}
            descricao={item.descricao}
            visualizacoes={item.visualizacoes}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
