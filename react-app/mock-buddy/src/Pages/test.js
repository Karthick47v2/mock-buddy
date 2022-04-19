import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";

// import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";
const socket = io(ENDPOINT);

// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user", // front-facing - needed for mobile phones
  frameRate: { ideal: 24, max: 30 },
};

export const Test = () => {
  const webcamRef = useRef(null);
  const [streamVid, setStreamVid] = useState(false);

  // useEffect(() => {
  //   if (!streamVid) return;
  //   socket.emit("test", "mydata");
  // }, [streamVid]);

  useEffect(() => {
    socket.on("get_output", (data) => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    if (!streamVid) return;

    const interval = setInterval(() => {
      const imgSrc = webcamRef.current.getScreenshot();
      if (!imgSrc) return;
      socket.emit("process_frame", imgSrc);
    }, 1000);
    return () => clearInterval(interval);
  }, [streamVid]);

  return (
    <>
      <Webcam
        audio={false}
        videoConstraints={videoConstraints}
        mirrored={true}
        screenshotFormat={"image/jpeg"}
        ref={webcamRef}
      />
      <button onClick={() => setStreamVid(!streamVid)}> Rec </button>
    </>
  );
};
