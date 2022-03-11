import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RouteApp from './routers/RouteApp';
import { store } from './state/store';
import './styles/styel.css'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store } >
      <RouteApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
