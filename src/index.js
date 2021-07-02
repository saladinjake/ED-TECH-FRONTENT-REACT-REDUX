import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
// bootstrap

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'


// import $ from "jquery"

import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
