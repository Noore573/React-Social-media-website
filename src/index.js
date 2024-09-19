import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import rootReducer from '';
import {userReducer} from "./reducers/userReducer.js"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
