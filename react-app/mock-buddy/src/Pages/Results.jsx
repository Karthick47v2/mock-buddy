import React, { useEffect } from "react";
import { Container, Col, Row, Image, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AccordionMapper } from "../Components/accordionMapper";
import { practiceActions } from "../store/practice-slice";
import audio from "../Images/results-page/audio.svg";
import video from "../Images/results-page/video.svg";

export const Results = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.practice.isLoading);
  const audioResults = useSelector((state) => state.av.audioResults);
  const videoResults = useSelector((state) => state.av.videoResults);

  const audioScores = [
    {
      val: audioResults.wpm,
      attr: `Speech rate (wpm): `,
      expl: `This is insights of ..`,
    },
    {
      val: "0",
      attr: `Speech confidence score: `,
      expl: `This is insights of ..`,
    },
  ];

  const videoScores = [
    {
      val: videoResults.visibility_score,
      attr: `Visibility score: `,
      expl: `This is insights of ..`,
    },
    {
      val: videoResults.posture_score,
      attr: `Posture score: `,
      expl: `This is insights of ..`,
    },
    {
      val: videoResults.interactivity_score,
      attr: `Interactivity score: `,
      expl: `This is insights of ..`,
    },
  ];

  useEffect(() => {
    if (
      !(
        Object.keys(audioResults).length === 0 ||
        Object.keys(videoResults).length === 0
      )
    ) {
      dispatch(practiceActions.switchLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioResults, videoResults]);
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden"> Loading... </span>
        </Spinner>
      ) : (
        <Container className="my-5 text-secondary">
          <div className="text-center">
            <h1 className="mb-5"> Results </h1>
          </div>
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
              <AccordionMapper scores={audioScores} />
            </Col>

            <Col>
              <AccordionMapper scores={videoScores} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
