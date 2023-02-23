import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './src/App';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';
// process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
