import { avActions } from "./av-slice";

export const fetchAudioResults = (post) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch("http://127.0.0.1:5000/audio_out/", post);
      return res.json();
    };
    try {
      const audio = await fetchHandler();
      console.log(audio);
      dispatch(avActions.setAudioResults(audio));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const fetchVideoResults = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch("http://127.0.0.1:5000/vid_fb/");
      return res.json();
    };
    try {
      const video = await fetchHandler();
      console.log(video);
      dispatch(avActions.setVideoResults(video));
    } catch (err) {
      console.log(err.message);
    }
  };
};
