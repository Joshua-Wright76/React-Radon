import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import {Provider} from 'react-radon';
import silo from './state/combineNodes.js';

render(
  <Provider silo={silo}>
    <App />
  </Provider>,
  document.getElementById('root')
);
