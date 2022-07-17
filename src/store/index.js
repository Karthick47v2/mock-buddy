import { configureStore } from "@reduxjs/toolkit";
import avSlice from "./av-slice";
import practiceSlice from "./practice-slice";
import slideSlice from "./slide-slice";

const store = configureStore({
  reducer: {
    av: avSlice.reducer,
    practice: practiceSlice.reducer,
    slide: slideSlice.reducer,
  },
});

export default store;
