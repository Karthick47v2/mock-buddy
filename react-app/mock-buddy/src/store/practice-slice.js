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
    switchLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const practiceActions = practiceSlice.actions;

export default practiceSlice;
