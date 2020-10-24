import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="barraDeNavegacao navbar navbar-expand-lg">
      <i className="far fa-calendar-alt text-white fa-2x mr-2"></i>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {useSelector(state => state.usuarioLogado) > 0 ? (
            <>
              <li>
                <Link to="/publicareventos" className="nav-link">
                  Publicar Evento
                </Link>
              </li>

              <li>
                <Link to="/eventos/meuseventos" className="nav-link">
                  Meus Eventos
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => dispatch({ type: 'LOG_OUT' })}
                  className="nav-link"
                >
                  Sair
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/cadastrar" className="nav-link">
                  Cadastrar
                </Link>
              </li>

              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
