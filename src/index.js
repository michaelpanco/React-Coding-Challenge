import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import rootReducer from './reducers'
import './styles/_main.scss';

require('dotenv').config()

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CoreLayout>
        <Routes />
      </CoreLayout>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
