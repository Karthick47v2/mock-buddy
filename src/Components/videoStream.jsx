/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { ReactMic } from "react-mic";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAudioResults, fetchVideoResults } from "../store/av-actions";
import { avActions } from "../store/av-slice";
import { practiceActions } from "../store/practice-slice";
import { slideActions } from "../store/slide-slice";

/**
 * websocket
 * @type {socket}
 */
const video_socket = io(process.env.REACT_APP_END_POINT);
const audio_socket = io(process.env.REACT_APP_AUDIO_END_POINT);

export const VideoStream = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRecord = useSelector((state) => state.av.isRecord);

  const [height, setHeight] = useState(600);
  const [width, setWidth] = useState(800);
  const [dummyRec, setDummyRec] = useState(false);
  const divRef = useRef(null);

  // reference for webcam
  const webcamRef = useRef(null);

  // send recorded audio and request for audio & video feedback on record stop
  const onRecStop = async (blob) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob["blob"]);
    reader.onloadend = function () {
      let b64 = reader.result;
      audio_socket.emit("audio_out", b64);
    };

    setDummyRec(true);
  };

  useEffect(() => {
    if (!isRecord && dummyRec) {
      dispatch(avActions.resetResults());
      dispatch(slideActions.resetResults());

      dispatch(practiceActions.switchLoading(true));
      dispatch(practiceActions.switchRestrictAccess(false));

      // GET req - video
      dispatch(fetchVideoResults());
      dispatch(fetchAudioResults());
      navigate("results");
    }
  }, [dummyRec, isRecord]);

  useEffect(() => {
    if (isRecord) {
      setDummyRec(true);
      const recSwitch = setInterval(() => {
        setDummyRec(false);
      }, 10000);
      return () => clearInterval(recSwitch);
    }
  }, [isRecord]);

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
    fetch(process.env.REACT_APP_END_POINT + "init/")
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
      if (!webcamRef.current.getScreenshot()) return;
      video_socket.emit("process_frame", webcamRef.current.getScreenshot());
    }, 1000);
    return () => clearInterval(socketInterval);
  }, [isRecord]);

  useEffect(() => {
    let h = window.innerHeight;
    let w = window.innerWidth;

    if (window.screen.availWidth > window.screen.availHeight) {
      h = window.innerWidth;
      w = window.innerHeight;
    }

    if (h > 768 && w > 1024) {
      setHeight(600);
      setWidth(800);
    } else {
      setHeight((3 * h) / 4);
      setWidth((3 * w) / 4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerHeight, window.innerWidth]);

  return (
    <div ref={divRef}>
      <Webcam
        audio={false}
        videoConstraints={{
          width: width,
          height: height,
          facingMode: "user",
          frameRate: { ideal: 24, max: 30 },
        }}
        mirrored={true}
        screenshotFormat={"image/jpeg"}
        ref={webcamRef}
        style={{ visibility: "hidden" }}
      />
      <div style={{ display: "none" }}>
        <ReactMic
          record={isRecord && dummyRec}
          onStop={onRecStop}
          mimeType="audio/wav"
          channelCount={1}
          sampleRate={44100}
        />
      </div>
    </div>
  );
};
