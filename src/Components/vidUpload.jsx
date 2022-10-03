import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DrivePicker } from "./drivePicker";
import { practiceActions } from "../store/practice-slice";
import { avActions } from "../store/av-slice";
import { slideActions } from "../store/slide-slice";

export const VidUpload = () => {
  const dispatch = useDispatch();
  const gLink = useSelector((state) => state.slide.slidesLink);
  const dLink = useSelector((state) => state.av.driveLink);
  const [isSlideShared, setIsSlideShared] = useState(true);
  const [isCRCTVidShared, setIsCRCTVidShared] = useState("");

  const onClickHandler = () => {
    dispatch(avActions.resetResults());
    dispatch(slideActions.resetResults());

    dispatch(practiceActions.switchLoading(true));
    dispatch(practiceActions.switchRestrictAccess(false));

    // // POST req - audio
    // dispatch(fetchAudioResults({ method: "POST", body: formData }));

    // // GET req - video
    // dispatch(fetchVideoResults());
    // navigate("results");
  };

  return (
    <>
      <div className="mt-3 d-flex flex-row">
        <DrivePicker
          label={"Choose Slide"}
          viewId={"PRESENTATIONS"}
          callback={(data) => {
            if (data.action === "picked") {
              if (data.docs[0].isShared) {
                setIsSlideShared(true);
                dispatch(
                  slideActions.setSlideLink({
                    gLink: data.docs[0].url,
                  })
                );
              } else {
                setIsSlideShared(false);
              }
            }
          }}
        />
        <h5
          className="ms-5"
          style={{ color: isSlideShared ? "white" : "#aa070d" }}
        >
          {isSlideShared
            ? "Select your presentation slide (publicly shared Google Slide)"
            : "Please select publicly shared slide"}
        </h5>
      </div>
      <div className="mt-3 d-flex flex-row">
        <DrivePicker
          label={"Choose Video"}
          viewId={"DOCS_VIDEOS"}
          callback={(data) => {
            if (data.action === "picked") {
              if (data.docs[0].isShared) {
                if (data.docs[0].mimeType.includes("mp4")) {
                  if (data.docs[0].sizeBytes / 1024 / 1024 < 100) {
                    setIsCRCTVidShared("");
                    dispatch(
                      avActions.setDriveLink({
                        dLink: data.docs[0].url,
                      })
                    );
                  } else {
                    setIsCRCTVidShared("Video exceeded upload limit");
                  }
                } else {
                  setIsCRCTVidShared("Currently we only support *.mp4 files");
                }
              } else {
                setIsCRCTVidShared("Video not shared publicly");
              }
            }
          }}
        />
        <h5
          className="ms-5"
          style={{ color: isCRCTVidShared ? "#aa070d" : "white" }}
        >
          {isCRCTVidShared
            ? isCRCTVidShared
            : "Select practice video from google drive (*.mp4 under 100mb)"}
        </h5>
      </div>
      <Button
        className="mt-5"
        variant="success"
        onClick={onClickHandler}
        disabled={
          gLink ===
            "https://docs.google.com/presentation/d/1Dpv-1o9F3g6fZtwiel9boE8Vd1u_GJIpHEU6sO6OTR8/edit?usp=sharing" ||
          !dLink
        }
      >
        Get Results
      </Button>
    </>
  );
};
