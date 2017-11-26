import React from 'react';

import { Route, BrowserRouter } from 'react-router-dom';
import Root from './containers/root';
import Post from './containers/post';

const App = () => (
  <BrowserRouter>
    <div>
      <Route
        exact
        path="/"
        component={Root}
      />
      <Route
        path="/category/:category"
        component={Root}
      />
      <Route
        path="/post/:postId"
        component={Post}
      />
    </div>
  </BrowserRouter>
);

export default App;
