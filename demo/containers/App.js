import React, { Component } from 'react';
import Demo from './Demo';
import { createStore, combineReducers, compose } from 'redux';

import { Provider } from 'react-redux';
import * as reducers from '../reducers';

const finalCreateStore = compose(
  createStore
);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <Demo /> }
        </Provider>
    </div>
    );
  }
}
