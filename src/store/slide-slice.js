import { createSlice } from "@reduxjs/toolkit";

const slideSlice = createSlice({
  name: "slide",
  initialState: {
    slidesLink:
      "https://docs.google.com/presentation/d/1Dpv-1o9F3g6fZtwiel9boE8Vd1u_GJIpHEU6sO6OTR8/edit?usp=sharing",
    errorStatus: false,
  },
  reducers: {
    setErrorStatus(state, action) {
      state.errorStatus = action.payload.status;
      if (!action.payload.status) {
        state.slidesLink = action.payload.gLink;
      }
    },
  },
});

export const slideActions = slideSlice.actions;

export default slideSlice;
