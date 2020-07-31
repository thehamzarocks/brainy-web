import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { Provider } from "react-redux";
// import { createStore, combineReducers, applyMiddleware } from "redux";
// import rootReducer from './reducers'
// import { fileSlice } from "./fileSlice";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import thunkMiddleware from "redux-thunk";
// import filesReducer from "./fileSlice";
import { store } from './store/index.js';
Amplify.configure(awsExports);

// const rootReducer = combineReducers({
//   files: fileSlice.reducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// const store = createStore(rootReducer)

// const store = configureStore({
//   reducer: {
//     files: filesReducer,
//   },
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [applyMiddleware(thunk), getDefaultMiddleware(thunk)],
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
