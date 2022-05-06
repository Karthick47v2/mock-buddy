import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import { ReactMic } from "react-mic";
import { getNetSpeed } from "../Components/netspeed_checker";
import socketIOClient from "socket.io-client";

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

  const onRecStop = (blob) => {
    const formData = new FormData();
    let blobWithProp = new Blob([blob["blob"]], blob["options"]);

    formData.append("file", blobWithProp);

    const postRequest = {
      method: "POST",
      body: formData,
    };
    fetch("http://127.0.0.1:5000/audio_out/", postRequest)
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          const err = (data && data.message) || res.status;
          return Promise.reject(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.on("get_output", (data) => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    const netInterval = setInterval(() => {
      getNetSpeed();
    }, 5000);
    return () => clearInterval(netInterval);
  }, []);

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
      <div style={{ display: "none" }}>
        <ReactMic
          record={streamVid}
          onStop={onRecStop}
          mimeType="audio/wav"
          channelCount={1}
          sampleRate={44100}
        />
      </div>
      <button onClick={() => setStreamVid(!streamVid)}> Rec </button>
    </>
  );
};
