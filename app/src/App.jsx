import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './_reducers';
import middlewares from './_middlewares';


let oldState = JSON.parse(localStorage.getItem('HUGO-CMS-state'));

if (oldState) {
  console.log('Reloaded old state');
} else {
  oldState = {
    authenticationState: undefined,
    loadState: undefined,
  };
}

let store;
if (NODE_ENV !== 'production') {
  const { composeWithDevTools } = require('redux-devtools-extension'); // eslint-disable-line global-require, import/no-extraneous-dependencies
  store = createStore(reducers, oldState, composeWithDevTools(middlewares));
} else {
  store = createStore(reducers, oldState, middlewares);
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
