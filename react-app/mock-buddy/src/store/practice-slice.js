import { createSlice } from "@reduxjs/toolkit";

const practiceSlice = createSlice({
  name: "practice",
  initialState: {
    showModal: true,
    presentationMode: true,
    isLoading: false,
  },
  reducers: {
    switchModalVisibility(state, action) {
      state.showModal = action.payload;
    },
    switchPresentationMode(state, action) {
      state.presentationMode = action.payload;
    },
    switchLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export const practiceActions = practiceSlice.actions;

export default practiceSlice;
