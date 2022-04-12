import React, { useState } from "react";
import { OpenCvProvider } from "opencv-react";

const MyComponent = () => {
  return <p> OpenCv React test </p>;
};

const FaceDetection = () => {
  return <p> Loaded </p>;
};

export const CV = () => {
  const [cvLoaded, setCVLoaded] = useState(false);
  const onLoaded = (cv) => {
    setCVLoaded(true);
  };
  return (
    <OpenCvProvider onLoad={onLoaded} openCvPath="/opencv/opencv.js">
      {/* Conditional rendering */}
      {cvLoaded ? <FaceDetection /> : <MyComponent />}
    </OpenCvProvider>
  );
};
