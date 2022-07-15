import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { ReactMic } from "react-mic";
import { io } from "socket.io-client";
import { req } from "./req";

/**
 * Socket endpoint address
 * @type {string}
 */
const ENDPOINT = "http://127.0.0.1:5000";

/**
 * websocket
 * @type {socket}
 */
const socket = io(ENDPOINT);

/**
 * Video preview constraints
 * @type {{width: number, height: number, facingMode: string, frameRate: {idea: number, max: number}}}
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia"> getUserMedia </a>
 */
const videoConstraints = {
  width: 800,
  height: 600,
  facingMode: "user",
  frameRate: { ideal: 24, max: 30 },
};

/**
 * JSX component for AV stream
 * @param {Object} props - component props
 * @param {Boolean} props.isRecord - recording status
 * @param {String} props.imageSrc - webcam screenshot on Base64 format
 * @param {(imgSrc: String) => void} props.handleImgSrc - set imgSrc
 * @returns {JSX.Element} - popup modal
 */
export const VideoStream = (props) => {
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
    req("http://127.0.0.1:5000/audio_out/", postRequest);

    // GET req - video
    req("http://127.0.0.1:5000/vid_fb/", { method: "GET" });
  };

  // webcam preview
  useEffect(() => {
    const previewInterval = setInterval(() => {
      props.handleImgSrc(webcamRef.current.getScreenshot());
    }, 100);
    return () => clearInterval(previewInterval);
    // eslint-disable-next-line
  }, [props.isRecord]);

  // send frames to server in an interval when record button pressed
  useEffect(() => {
    if (!props.isRecord) return;

    // GET req - reset required variables on start
    req("http://127.0.0.1:5000/init/", { method: "GET" });

    // socket connection
    const socketInterval = setInterval(() => {
      if (!props.imageSrc) return;
      socket.emit("process_frame", props.imageSrc);
    }, 1000);
    return () => clearInterval(socketInterval);
    // eslint-disable-next-line
  }, [props.isRecord]);

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
          record={props.isRecord}
          onStop={onRecStop}
          mimeType="audio/wav"
          channelCount={1}
          sampleRate={44100}
        />
      </div>
    </>
  );
};
