import { avActions } from "./av-slice";

const ENDPOINT = "https://mock-buddy.herokuapp.com/";

export const fetchAudioResults = (post) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(ENDPOINT + "audio_out/", post);
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
      const res = await fetch(ENDPOINT + "vid_fb/");
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
