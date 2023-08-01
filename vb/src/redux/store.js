import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import vbReducer from "./vbSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// let persistor = persistStore(store);

const persistedReducer = persistReducer(persistConfig, vbReducer);

export const store = configureStore({
  reducer: { vb: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
