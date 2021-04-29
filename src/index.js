import { configure } from "mobx";
import { Provider } from "mobx-react";
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker';
//import { Provider } from 'react-redux';
import App from "./components/App";
import appStore from "./stores/appStore";
import imageStore from "./stores/imageStore";
import { BrowserRouter as BrowserRouter } from "react-router-dom";

configure({ enforceActions: true });

const stores = {
  imageStore,
  appStore
};


ReactDOM.render(
  <Provider {...stores}>
 
      <App />

  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


//serviceWorker.unregister();
