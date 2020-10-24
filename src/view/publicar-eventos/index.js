import React, { useState, useEffect } from 'react';
import './publicar-eventos.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import firebase from 'firebase';

import Navbar from '../../components/navbar';

function EventoCadastro(props) {
  const [msgTipo, setMsgTipo] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [descricao, setDescricao] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [fotoAtual, setFotoAtual] = useState();
  const [fotoNova, setFotoNova] = useState();
  const [carregando, setCarregando] = useState();

  const storage = firebase.storage();
  const db = firebase.firestore();

  const usuarioEmail = useSelector(state => state.usuarioEmail);

  useEffect(() => {
    if (props.match.params.id) {
      firebase
        .firestore()
        .collection('eventos')
        .doc(props.match.params.id)
        .get()
        .then(resultado => {
          setTitulo(resultado.data().titulo);
          setTipo(resultado.data().tipo);
          setDescricao(resultado.data().descricao);
          setData(resultado.data().data);
          setHora(resultado.data().hora);
          setFotoAtual(resultado.data().foto);
        });
    }
  }, [carregando]);

  function atualizar() {
    setMsgTipo(null);
    setCarregando(1);

    if (!titulo || !tipo || !descricao || !data || !hora) {
      setMsgTipo('erro');
      return;
    }

    if (fotoNova) storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);

    db.collection('eventos')
      .doc(props.match.params.id)
      .update({
        titulo: titulo,
        tipo: tipo,
        descricao: descricao,
        data: data,
        hora: hora,
        foto: fotoNova ? fotoNova.name : fotoAtual
      })
      .then(() => {
        setMsgTipo('sucesso');
        setCarregando(0);
      })
      .catch(erro => {
        setMsgTipo('erro');
        setCarregando(0);
      });
  }

  function cadastrar() {
    setMsgTipo(null);
    setCarregando(1);

    if (!titulo || !tipo || !descricao || !data || !hora || !fotoNova) {
      setMsgTipo('erro');
      return;
    }
    storage
      .ref(`imagens/${fotoNova.name}`)
      .put(fotoNova)
      .then(() => {
        db.collection('eventos')
          .add({
            titulo: titulo,
            tipo: tipo,
            descricao: descricao,
            data: data,
            hora: hora,
            usuario: usuarioEmail,
            visualizacoes: 0,
            foto: fotoNova.name,
            publico: 0,
            criacao: new Date()
          })
          .then(() => {
            setMsgTipo('sucesso');
            setCarregando(0);
          });
      })
      .catch(erro => {
        setMsgTipo('erro');
        setCarregando(0);
      });
  }
  return (
    <>
      {useSelector(state =>
        state.usuarioLogado === 0 ? <Redirect to="/login" /> : null
      )}
      <Navbar />
      <div className="col-12 mt-5">
        <div className="row">
          <h3 className="mx-auto font-weight-bold">
            {props.match.params.id ? 'Atualizar Evento' : 'Publicar Evento'}
          </h3>
        </div>

        <form>
          <div className="form-group">
            <label>Título:</label>
            <input
              onChange={e => setTitulo(e.target.value)}
              type="text"
              className="form-control"
              value={titulo && titulo}
            />
          </div>

          <div className="form-group">
            <label>Tipo do evento:</label>
            <select
              onChange={e => setTipo(e.target.value)}
              className="form-control"
              value={tipo && tipo}
            >
              <option disabled selected>
                -- Selecione um tipo --
              </option>
              <option>Festa</option>
              <option>Teatro</option>
              <option>Show</option>
              <option>Meetup</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição do evento:</label>
            <textarea
              onChange={e => setDescricao(e.target.value)}
              className="form-control"
              rows="3"
              value={descricao && descricao}
            />
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label>Data:</label>
              <input
                onChange={e => setData(e.target.value)}
                type="date"
                className="form-control"
                value={data && data}
              />
            </div>

            <div className="col-6">
              <label>Hora:</label>
              <input
                onChange={e => setHora(e.target.value)}
                type="time"
                className="form-control"
                value={hora && hora}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Upload de imagem:{' '}
              {props.match.params.id &&
                'Não é necessário enviar uma nova imagem caso queira manter a atual'}
            </label>
            <input
              type="file"
              onChange={e => setFotoNova(e.target.files[0])}
              className="form-control"
            />
          </div>
          {carregando ? (
            <button
              className="btn btn-lg btn-publicar-eventos btn-block"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm my-1"
                role="status"
                aria-hidden="true"
              />
              Carregando...
            </button>
          ) : (
            <button
              onClick={props.match.params.id ? atualizar : cadastrar}
              type="button"
              className="btn btn-lg btn-block mt-3 mb-5 btn-publicar-eventos"
            >
              {props.match.params.id ? 'Atualizar' : 'Publicar Evento'}
            </button>
          )}
        </form>

        <div className="msg-login text-center mt-2">
          {msgTipo === 'sucesso' &&
            (props.match.params.id ? (
              <>
                <span>
                  <strong>Ebaa!</strong> O evento foi atualizado! &#128518;
                </span>
              </>
            ) : (
              <span>
                <strong>Uhuu!</strong> O evento foi publicado! &#128518;
              </span>
            ))}

          {msgTipo === 'erro' && (
            <span>
              <strong>Oops!</strong> Verifique se todos os campos foram
              preenchidos! &#128555;
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default EventoCadastro;
