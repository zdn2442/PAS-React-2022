import {
    legacy_createStore,
    combineReducers,
    applyMiddleware,
    compose,
  } from "redux";
  import { authProcess } from "../reducers/authReducer";
  import thunk from "redux-thunk";
  
  let allReducers = combineReducers({
    auth: authProcess
  });
  
  // export const store = legacy_createStore(
  //   allReducers,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // );
  
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  
  export const store = legacy_createStore(
    allReducers,
    composeEnhancers(applyMiddleware(thunk))
  );