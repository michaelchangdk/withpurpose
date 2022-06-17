import React from "react";
import { Provider } from "react-redux";
import { compose, createStore, combineReducers } from "@reduxjs/toolkit";
import persistState from "redux-localstorage";
import Router from "./pages/Router";
import { authenticated } from "./reducers/authenticated";

const enhancer = compose(persistState());

const reducer = combineReducers({
  authenticated: authenticated.reducer,
});

const store = createStore(reducer, enhancer);

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
