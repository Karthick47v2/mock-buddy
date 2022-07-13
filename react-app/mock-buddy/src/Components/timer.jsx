import { useEffect, useState } from "react";

/**
 * JSX component for timer
 * @param {Object} props - component props
 * @param {Boolean} props.isActive - recording status
 * @returns {JSX.Element} - popup modal
 */
export const Timer = (props) => {
  /**
   * @type {[Object, Function]} Time({Seconds, Minute, Counter})
   */
  const [time, setTime] = useState({
    sec: "00",
    min: "00",
    counter: 0,
  });

  useEffect(() => {
    let intervalId;

    if (props.isActive) {
      intervalId = setInterval(() => {
        const secCounter = time.counter % 60;
        const minCounter = Math.floor(time.counter / 60);

        setTime((prevState) => ({
          sec: String(secCounter).padStart(2, "0"),
          min: String(minCounter).padStart(2, "0"),
          counter: prevState.counter + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [props.isActive, time.counter]);

  return (
    <h2>
      {time.min} : {time.sec}
    </h2>
  );
};
