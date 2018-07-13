import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import moviedbApp from './reducers/moviedbApp';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(moviedbApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
