/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Image,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { practiceActions } from "../store/practice-slice";
import { fetchPPTXResults } from "../store/slide-actions";
import { SlideResults } from "../Components/slideResults";
import { AudioResults } from "../Components/audioResults";
import { VideoResults } from "../Components/videoResults";
import audio from "../Images/results-page/audio.svg";
import video from "../Images/results-page/video.svg";
import "../CSS/tabs.css";

export const Results = () => {
  const dispatch = useDispatch();
  const gLink = useSelector((state) => state.slide.slidesLink);
  const loading = useSelector((state) => state.practice.isLoading);
  const audioResults = useSelector((state) => state.av.audioResults);
  const videoResults = useSelector((state) => state.av.videoResults);
  const pptxResults = useSelector((state) => state.slide.pptxResults);

  useEffect(() => {
    if (
      !(
        Object.keys(audioResults).length === 0 ||
        Object.keys(videoResults).length === 0
      )
    ) {
      dispatch(
        fetchPPTXResults({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: gLink }),
        })
      );
    }
  }, [audioResults, videoResults]);

  useEffect(() => {
    if (Object.keys(pptxResults).length !== 0) {
      dispatch(practiceActions.switchLoading(false));
    }
  }, [pptxResults]);

  return (
    <>
      {loading ? (
        <Spinner
          animation="border"
          variant="secondary"
          role="status"
          className="position-fixed top-50 end-50"
        >
          <span className="visually-hidden"> Loading... </span>
        </Spinner>
      ) : (
        <Container className="my-5 text-secondary">
          <div className="text-center">
            <h1 className="mb-5"> Results </h1>
          </div>
          <Tabs defaultActiveKey={"performance"} className="mb-5" justify>
            <Tab eventKey={"performance"} title="Performance metrics">
              <Row>
                <Col>
                  <Image src={audio} fluid style={{ maxWidth: "60%" }} />
                </Col>

                <Col>
                  <Image src={video} fluid style={{ maxWidth: "60%" }} />
                </Col>
              </Row>

              <Row>
                <Col>
                  <AudioResults />
                </Col>
                <Col>
                  <VideoResults />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey={"slide"} title="Slide metrics">
              <SlideResults />
            </Tab>
          </Tabs>
        </Container>
      )}
    </>
  );
};
