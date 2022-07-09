import { useRef, useEffect } from "react";
import { Webcam } from "react-webcam";
import { ReactMic } from "react-mic";
import { io } from "socket.io-client";

// stream AV

// socket endpoint
const ENDPOINT = "http://127.0.0.1:5000";
const socket = io(ENDPOINT);

// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
const videoConstraints = {
  width: 640, // preview width
  height: 480, // preview heighy
  facingMode: "user", // front-facing, explicitly defined for mobile devices
  frameRate: { ideal: 24, max: 30 }, // get ideal frame rate if browser supports else get something lessthan max
};

export const VideoStream = ({ isRecord }) => {
  /*
  isRecord(bool): 'Record' button status
  */

  // reference for webcam
  const webcamRef = useRef(null);

  // send recorded audio and request for audio & video feedback on record stop
  const onRecStop = (blob) => {
    // send recorded audio wrapped in formdat as POST req
    const formData = new FormData();
    let blobWithProp = new Blob([blob["blob"]], blob["options"]);

    formData.append("file", blobWithProp);

    const postRequest = {
      method: "POST",
      body: formData,
    };
    // POST req - audio
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

    // GET req - video
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

  // send frames to server in an interval when record button pressed
  useEffect(() => {
    if (!isRecord) return;

    // GET req - reset required variables on start
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

    // socket connection
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
