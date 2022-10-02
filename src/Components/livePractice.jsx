import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToggleButtonGroup, ToggleButton, Button } from "react-bootstrap";
import { practiceActions } from "../store/practice-slice";
import { avActions } from "../store/av-slice";
import { Slide } from "./slide";
import { Timer } from "./timer";
import { VideoStream } from "./videoStream";

export const LivePractice = () => {
  const dispatch = useDispatch();

  const camPreview = useSelector((state) => state.av.showCamPreview);
  const permission = useSelector((state) => state.av.permissionStatus);
  const record = useSelector((state) => state.av.isRecord);
  const showModal = useSelector((state) => state.practice.showModal);

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "-1",
          margin: "0px",
        }}
      >
        <VideoStream />
      </div>
      <Slide />

      <div className="mt-5 mb-3 d-flex justify-content-center">
        <Button
          variant="danger"
          disabled={permission === "Rejected" || record}
          onClick={() => dispatch(avActions.switchRecordingStatus())}
          className="me-3"
        >
          Record
        </Button>
        <Button
          variant="warning"
          disabled={permission === "Rejected" || record || showModal}
          onClick={() => dispatch(practiceActions.switchModalVisibility(true))}
          className="me-3"
        >
          Change Slides
        </Button>
        <ToggleButtonGroup type="checkbox">
          <ToggleButton
            id="cam-toggle"
            type="checkbox"
            checked={camPreview}
            variant="outline-secondary"
            disabled={permission === "Rejected"}
            onChange={() => dispatch(avActions.switchCamPreview())}
            value="1"
            className="me-3"
          >
            {camPreview ? "Hide" : "Show"} Webcam
          </ToggleButton>
        </ToggleButtonGroup>

        <Button
          variant="success"
          disabled={!record}
          onClick={() => dispatch(avActions.switchRecordingStatus())}
        >
          Finish
        </Button>
      </div>
      <div className="mt-5">
        <h5> Time </h5>
        <Timer />
      </div>
    </>
  );
};
