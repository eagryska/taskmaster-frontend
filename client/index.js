/* eslint-disable import/imports-first */
/* global document */

import App from './components/App';
import TaskManager from './components/TaskManager';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={TaskManager} />
    </Route>
  </Router>
  , document.getElementById('root'));
