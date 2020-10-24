import React, { useState } from 'react';
import './usuario-recuperar-senha.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

import Navbar from '../../components/navbar';

function UsuarioRecuperarSenha() {
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();

  function recuperaSenha() {
    setCarregando(1);
    if (!email) {
      setCarregando(0);
      setMsg('É necessário digitar o email para recuperar a senha!');
      return;
    }
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(resultado => {
        setCarregando(0);
        setMsg('Um link para redefinição de senha foi enviado para seu email!');
      })
      .catch(erro => {
        setCarregando(0);
        setMsg('Verifique se o email está correto.');
      });
  }

  return (
    <>
      <Navbar />

      <form className="text-center form-login mx-auto mt-5">
        <h1 className="h3 mb-3 text-black font-weigth-bold">Recuperar Senha</h1>
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          className="form-control my-2"
          placeholder="Email"
        />
        {carregando ? (
          <button
            className="btn btn-lg btn-enviar btn-block"
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
            onClick={recuperaSenha}
            className="btn btn-lg btn-enviar btn-block"
            type="button"
          >
            Enviar
          </button>
        )}

        <div className="msg my-4 text-center">
          <span>{msg}</span>
        </div>
      </form>
    </>
  );
}

export default UsuarioRecuperarSenha;
