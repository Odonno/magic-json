import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, Store as ReduxStore } from 'redux';
import { Provider } from 'react-redux';

import * as State from './state';
import { reducers, initialState } from './reducers';

import App from './App';

import './index.css';

const store: ReduxStore<State.Root> = createStore(reducers, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
