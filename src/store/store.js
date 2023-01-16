import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./middleware/errors";
import { logger } from "./middleware/logger";
import taskReducer from "./task";

const rootReducers = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export default createStore;
