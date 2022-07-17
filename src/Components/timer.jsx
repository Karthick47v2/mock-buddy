import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Timer = () => {
  const isActive = useSelector((state) => state.av.isRecord);
  /**
   * @type {[number, Function]} Counter
   */
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  return (
    <h2>
      {String(Math.floor(counter / 60)).padStart(2, "0")} :{" "}
      {String(counter % 60).padStart(2, "0")}
    </h2>
  );
};
