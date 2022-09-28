/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { ReactMic } from "react-mic";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAudioResults, fetchVideoResults } from "../store/av-actions";
import { avActions } from "../store/av-slice";
import { practiceActions } from "../store/practice-slice";

/**
 * Socket endpoint address
 * @type {string}
 */
const ENDPOINT = "https://mock-buddy.herokuapp.com/";

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

export const VideoStream = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRecord = useSelector((state) => state.av.isRecord);
  const imgSrc = useSelector((state) => state.av.imgSrc);

  // reference for webcam
  const webcamRef = useRef(null);

  // send recorded audio and request for audio & video feedback on record stop
  const onRecStop = async (blob) => {
    // send recorded audio wrapped in formdat as POST req
    const formData = new FormData();
    let blobWithProp = new Blob([blob["blob"]], blob["options"]);

    formData.append("file", blobWithProp);

    dispatch(practiceActions.switchLoading(true));

    // POST req - audio
    dispatch(fetchAudioResults({ method: "POST", body: formData }));

    // GET req - video
    dispatch(fetchVideoResults());
    navigate("results");
  };

  // webcam preview
  useEffect(() => {
    const previewInterval = setInterval(() => {
      dispatch(avActions.setImgSrc(webcamRef.current.getScreenshot()));
    }, 100);
    return () => clearInterval(previewInterval);
  }, [isRecord]);

  // send frames to server in an interval when record button pressed
  useEffect(() => {
    if (!isRecord) return;

    // GET req - reset required variables on start
    fetch(ENDPOINT + "init/")
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
    const socketInterval = setInterval(() => {
      if (!imgSrc) return;
      socket.emit("process_frame", imgSrc);
    }, 1000);
    return () => clearInterval(socketInterval);
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
