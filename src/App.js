import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store/index';
import { PersistGate } from 'redux-persist/integration/react';

/* Páginas */

import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import Home from './view/home';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha';
import PublicarEventos from './view/publicar-eventos';
import EventoDetalhes from './view/evento-detalhes';
import EventoCadastro from './view/publicar-eventos';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/eventos/:parametro" component={Home} />
          <Route exact path="/cadastrar" component={NovoUsuario} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/recuperarsenha"
            component={UsuarioRecuperarSenha}
          />
          <Route exact path="/publicareventos" component={PublicarEventos} />
          <Route path="/detalhesevento/:id" component={EventoDetalhes} />
          <Route path="/editarevento/:id" component={EventoCadastro} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
