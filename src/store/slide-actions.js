import { slideActions } from "./slide-slice";

export const fetchPPTXResults = (post) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        process.env.REACT_APP_END_POINT + "slide_analyze/",
        post
      );
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
