import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import { ReactMic } from "react-mic";

const ENDPOINT = "http://127.0.0.1:5000";
const socket = io(ENDPOINT);

// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user", // front-facing - needed for mobile phones
  frameRate: { ideal: 24, max: 30 },
};

export const VideoStream = ({ isRecord }) => {
  const webcamRef = useRef(null);

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

    fetch("http://127.0.0.1:5000/vid_fb/")
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

  // useEffect(() => {
  //   socket.on("get_output", (data) => {
  //     if (data["status"] == 400) {
  //       visibility.push(1);
  //       face.push(data["face"] == 1);
  //       interactivity.push(data["face"] == 1 ? data["interactivity"] : 0);
  //     } else {
  //       visibility.push(0);
  //     }
  //   });
  // }, [socket]);

  useEffect(() => {
    if (!isRecord) return;

    fetch("http://127.0.0.1:5000/init/")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          const err = (data && data.message) || res.status;
          return Promise.reject(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const interval = setInterval(() => {
      const imgSrc = webcamRef.current.getScreenshot();
      if (!imgSrc) return;
      socket.emit("process_frame", imgSrc);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecord]);

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
          record={isRecord}
          onStop={onRecStop}
          mimeType="audio/wav"
          channelCount={1}
          sampleRate={44100}
        />
      </div>
    </>
  );
};
