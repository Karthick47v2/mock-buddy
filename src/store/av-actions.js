import { avActions } from "./av-slice";

export const fetchAudioResults = (post) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        process.env.REACT_APP_AUDIO_END_POINT + "audio_fb/",
        post
      );
      return res.json();
    };
    try {
      const audio = await fetchHandler();
      dispatch(avActions.setAudioResults(audio));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const fetchVideoResults = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(process.env.REACT_APP_END_POINT + "vid_fb/");
      return res.json();
    };
    try {
      const video = await fetchHandler();
      dispatch(avActions.setVideoResults(video));
    } catch (err) {
      console.log(err.message);
    }
  };
};
