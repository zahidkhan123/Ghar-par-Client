import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App.js";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducer";
import { createBrowserHistory } from "history";
import { GtmId } from "./constants/defaultValues";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: GtmId,
};

TagManager.initialize(tagManagerArgs);

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store);
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);
