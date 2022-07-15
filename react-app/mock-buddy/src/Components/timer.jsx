import React, { useEffect, useState } from "react";

/**
 * JSX component for timer
 * @param {Object} props - component props
 * @param {Boolean} props.isActive - recording status
 * @returns {JSX.Element} - popup modal
 */
export const Timer = (props) => {
  /**
   * @type {[number, Function]} Counter
   */
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;
    if (props.isActive) {
      intervalId = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [props.isActive, counter]);

  return (
    <h2>
      {String(Math.floor(counter / 60)).padStart(2, "0")} :{" "}
      {String(counter % 60).padStart(2, "0")}
    </h2>
  );
};
