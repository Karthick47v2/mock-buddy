import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import cv from "@techstark/opencv-js";
import {
  loadHaarFaceModels,
  detectHaarFace,
} from "../Components/haarFaceDetection";

// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user", // front-facing - needed for mobile phones
  frameRate: { ideal: 24, max: 30 },
};

// // https://blog.addpipe.com/audio-constraints-getusermedia/
// const audioConstraints = {
//   sampleSize: 16,
//   sampleRate: 44100,
//   channelCount: 1,
// };

// https://github.com/TechStark/opencv-js
export const Cam = () => {
  const webcamRef = useRef(null);
  const imgRef = useRef(null);
  const faceRef = useRef(null);

  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // run in page load
  useEffect(() => {
    loadHaarFaceModels().then(() => {
      setIsModelLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isModelLoaded) return;
    const detectFace = async () => {
      const imgSrc = webcamRef.current.getScreenshot();
      if (!imgSrc) return;

      return new Promise((resolve) => {
        imgRef.current.src = imgSrc;
        let img;
        imgRef.current.onload = () => {
          try {
            img = cv.imread(imgRef.current);
            detectHaarFace(img);
            cv.imshow(faceRef.current, img);
          } catch (e) {
            console.log(e);
          }
          img.delete();
          resolve();
        };
      });
    };

    let handle;

    const nextFrame = () => {
      handle = requestAnimationFrame(async () => {
        await detectFace();
        nextFrame();
      });
    };
    nextFrame();
    return () => {
      cancelAnimationFrame(handle);
    };
  }, [isModelLoaded]);

  return (
    <>
      <Webcam
        ref={webcamRef}
        videoConstraints={videoConstraints}
        mirrored
        screenshotFormat="image/jpeg"
      />
      <img alt="in" ref={imgRef} style={{ display: "none" }} />
      <canvas ref={faceRef} />
      {!isModelLoaded && <div>Loading Haar-cascade model...</div>}
    </>
  );
};
