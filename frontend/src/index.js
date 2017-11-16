import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './containers/home';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

// TODO: move to App component
const App = () => (
  <MuiThemeProvider>
    <Home />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()