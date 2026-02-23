import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import configureStore from './store.js';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from './store.js';

const container = document.getElementById("root");
const root = createRoot(container);
// const { store, persistor } = configureStore();

root.render(
  
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        <App />    
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
  
);

serviceWorker.unregister();
