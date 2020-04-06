import { createEpicMiddleware } from "redux-observable";
import { applyMiddleware, createStore } from "redux";
import { rootEpic, rootReducer } from "./roots";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

export default function configureStore() {
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  const epicMiddleware = createEpicMiddleware();
  const middleware = [epicMiddleware];

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  // run middleware to be activated
  epicMiddleware.run(rootEpic);

  return { persistor, store };
}
