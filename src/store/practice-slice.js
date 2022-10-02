import { createSlice } from "@reduxjs/toolkit";

const practiceSlice = createSlice({
  name: "practice",
  initialState: {
    showModal: true,
    practiceMode: true,
    isLoading: false,
    restrictResultsAccess: true,
  },
  reducers: {
    switchModalVisibility(state, action) {
      state.showModal = action.payload;
    },
    switchPracticeMode(state, action) {
      state.practiceMode = action.payload;
    },
    switchLoading(state, action) {
      state.isLoading = action.payload;
    },
    switchRestrictAccess(state, action) {
      state.restrictResultsAccess = action.payload;
    },
    resetReducer(state) {
      state.showModal = true;
      state.practiceMode = true;
      state.isLoading = false;
      state.restrictResultsAccess = true;
    },
  },
});

export const practiceActions = practiceSlice.actions;

export default practiceSlice;
