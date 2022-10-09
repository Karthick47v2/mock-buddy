import { createSlice } from "@reduxjs/toolkit";

const slideSlice = createSlice({
  // CEP-MID - https://docs.google.com/presentation/d/1BVRPYon5oT-a3WGGzN6gPHfZ_k9E9UwwbqazZeY1Srg/edit?usp=sharing
  name: "slide",
  initialState: {
    slidesLink:
      "https://docs.google.com/presentation/d/1Dpv-1o9F3g6fZtwiel9boE8Vd1u_GJIpHEU6sO6OTR8/edit?usp=sharing",
    errrorStatus: false,
    pptxResults: {},
  },
  reducers: {
    setErrorStatus(state, action) {
      state.errorStatus = action.payload.status;
      if (!action.payload.status) {
        state.slidesLink = action.payload.gLink;
      }
    },
    setPPTXResults(state, action) {
      state.pptxResults = action.payload;
    },
    resetResults(state) {
      state.pptxResults = {};
    },
    resetReducer(state) {
      state.errorStatus = false;
      state.slidesLink =
        "https://docs.google.com/presentation/d/1Dpv-1o9F3g6fZtwiel9boE8Vd1u_GJIpHEU6sO6OTR8/edit?usp=sharing";
      state.pptxResults = {};
    },
  },
});

export const slideActions = slideSlice.actions;

export default slideSlice;
