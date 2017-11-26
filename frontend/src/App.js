import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Root from './containers/root';
import Post from './containers/post';

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={Root}
        />
        <Route
          exact
          path="/:category/:postId"
          component={Post}
        />
        <Route
          path="/:category"
          component={Root}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
