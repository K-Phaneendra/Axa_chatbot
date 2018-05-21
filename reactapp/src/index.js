import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import combinedReducer from './reducers/combinedReducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(combinedReducer, applyMiddleware(thunk));
const app = document.getElementById('root');

ReactDOM.render(<Provider store={store}><App /></Provider>, app);
registerServiceWorker();