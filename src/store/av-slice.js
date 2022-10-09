import { createSlice } from "@reduxjs/toolkit";

const avSlice = createSlice({
  name: "av",
  initialState: {
    isRecord: false,
    permissionStatus: "null",
    showCamPreview: false,
    audioResults: {},
    videoResults: {},
    imgSrc: null,
  },
  reducers: {
    switchRecordingStatus(state) {
      state.isRecord = !state.isRecord;
    },
    writePermissionStatus(state, action) {
      state.permissionStatus = action.payload;
    },
    switchCamPreview(state) {
      state.showCamPreview = !state.showCamPreview;
    },
    setAudioResults(state, action) {
      state.audioResults = action.payload;
    },
    setVideoResults(state, action) {
      state.videoResults = action.payload;
    },
    setImgSrc(state, action) {
      state.imgSrc = action.payload;
    },
    resetResults(state) {
      state.audioResults = {};
      state.videoResults = {};
    },
    resetReducer(state) {
      state.isRecord = false;
      state.permissionStatus = "null";
      state.showCamPreview = false;
      state.audioResults = {};
      state.videoResults = {};
      state.imgSrc = null;
    },
  },
});

export const avActions = avSlice.actions;

export default avSlice;
