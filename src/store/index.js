import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import avSlice from "./av-slice";
import practiceSlice from "./practice-slice";
import slideSlice from "./slide-slice";

const persistConfig = {
  key: "main-root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  av: avSlice.reducer,
  practice: practiceSlice.reducer,
  slide: slideSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
