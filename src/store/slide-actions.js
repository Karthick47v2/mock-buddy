import { slideActions } from "./slide-slice";

// const ENDPOINT = "https://mock-buddy.herokuapp.com/";
const ENDPOINT = "http://127.0.0.1:5000/";

// multiprocessing
export const fetchPPTXResults = (post) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(ENDPOINT + "slide_analyze/", post);
      return res.json();
    };
    try {
      const res = await fetchHandler();
      dispatch(slideActions.setPPTXResults(res));
    } catch (err) {
      console.log(err.message);
    }
  };
};
