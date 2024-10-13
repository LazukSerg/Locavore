import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from './store.js';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />    
    </BrowserRouter>
  </Provider>
  
);

serviceWorker.unregister();
