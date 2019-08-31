import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import allReducers from './redux-base/reducers';
import './index.css';
import App from './containers/quiz/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(allReducers, applyMiddleware(thunk));
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
//registerServiceWorker();
