import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice.js";
import themeReducer from "./theme/themeSlice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "theme"],
};

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
