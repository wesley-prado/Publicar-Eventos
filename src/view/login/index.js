import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [carregando, setCarregando] = useState();

  const dispatch = useDispatch();

  function logar() {
    setCarregando(1);

    if (!email || !senha) {
      setCarregando(0);
      setMsgTipo('erro');
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(resultado => {
        setCarregando(0);
        setMsgTipo('sucesso');
        setTimeout(() => {
          dispatch({ type: 'LOG_IN', usuarioEmail: email });
        }, 2000);
      })
      .catch(erro => {
        setCarregando(0);
        console.log(erro);

        setMsgTipo('erro');
      });
  }

  return (
    <div className="login-content d-flex align-items-center">
      {useSelector(state =>
        state.usuarioLogado > 0 ? <Redirect to="/" /> : null
      )}

      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
          <i className="far fa-calendar-alt text-white fa-3x"></i>
          <h1 className="h3 my-3 font-weight-normal text-white font-weight-bold">
            Login
          </h1>
        </div>

        <input
          onChange={e => setEmail(e.target.value)}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              logar();
            }
          }}
          type="email"
          id="inputEmail"
          className="form-control my-2"
          placeholder="Email"
        />
        <input
          onChange={e => setSenha(e.target.value)}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              logar();
            }
          }}
          type="password"
          id="inputPassword"
          className="form-control my-2"
          placeholder="Senha"
        />

        {carregando ? (
          <button
            className="btn btn-lg btn-login btn-block"
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
            onClick={logar}
            className="btn btn-lg btn-login btn-block"
            type="button"
          >
            Entrar
          </button>
        )}

        <div className="msg-login text-white text-center my-4">
          {msgTipo === 'sucesso' && (
            <span>
              <strong>WoW!</strong> Você está conectado! &#128540;
            </span>
          )}

          {msgTipo === 'erro' && (
            <span>
              <strong>Oops!</strong> Verifique se a senha ou usuário corretos!
              &#128549;
            </span>
          )}
        </div>

        <div className="opcoes-login mt-5 text-center">
          <Link to="recuperarsenha" className="mx-2">
            Recuperar Senha
          </Link>
          <span className="text-white">&#9733;</span>
          <Link to="cadastrar" className="mx-2">
            Cadastrar-se
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
