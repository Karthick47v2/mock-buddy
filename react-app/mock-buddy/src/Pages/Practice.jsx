import React, { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { VideoStream } from "../Components/videoStream";
import { Slide } from "../Components/slide";
import { PermissionAlert } from "../Components/permissionAlert";
import { Timer } from "../Components/timer";
import { avActions } from "../store/av-slice";
import { practiceActions } from "../store/practice-slice";

export const Practice = () => {
  const dispatch = useDispatch();
  const permission = useSelector((state) => state.av.permissionStatus);
  const record = useSelector((state) => state.av.isRecord);
  const camPreview = useSelector((state) => state.av.showCamPreview);
  const loading = useSelector((state) => state.practice.isLoading);
  const mode = useSelector((state) => state.practice.presentationMode);
  const showModal = useSelector((state) => state.practice.showModal);
  const imgSrc = useSelector((state) => state.av.imgSrc);

  // useEffect(() => {
  //   if (audioRes != null) {
  //     console.log(audioRes);
  //     console.log(videoRes);
  //     navigate("results");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading]);

  // ask for permission on start
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => {
        dispatch(avActions.writePermissionStatus("Accepted"));
      })
      .catch(() => {
        dispatch(avActions.writePermissionStatus("Rejected"));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <h1 className="text-secondary"> Loading </h1>
      ) : (
        <Container>
          {permission === "Rejected" && <PermissionAlert />}
          <Row>
            <Col></Col>

            <Col>
              <Card
                className="my-3 p-5 text-center"
                bg="dark"
                text="white"
                border="secondary"
              >
                <Card.Header>
                  <ToggleButtonGroup
                    size="lg"
                    name="radio-btn"
                    type="radio"
                    className="mt-3"
                  >
                    <ToggleButton
                      id="presentation"
                      type="radio"
                      variant="outline-success"
                      value="1"
                      checked={mode}
                      onChange={(e) =>
                        dispatch(
                          practiceActions.switchPresentationMode(
                            e.currentTarget.value === "1"
                          )
                        )
                      }
                    >
                      Presentation Mode
                    </ToggleButton>
                    <ToggleButton
                      id="speech"
                      type="radio"
                      variant="outline-danger"
                      value="0"
                      checked={!mode}
                      onChange={(e) =>
                        dispatch(
                          practiceActions.switchPresentationMode(
                            e.currentTarget.value === "1"
                          )
                        )
                      }
                    >
                      Speech Mode
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Card.Header>
                {mode && <Slide />}
                <div
                  style={
                    mode
                      ? { position: "absolute", zIndex: "-1", margin: "125px" }
                      : {}
                  }
                >
                  <VideoStream />
                </div>
                {mode && camPreview && imgSrc && (
                  <img
                    alt="cam preview"
                    src={imgSrc}
                    style={{
                      height: "180px",
                      width: "240px",
                      position: "absolute",
                      zIndex: "1",
                      marginLeft: "25px",
                      marginTop: "135px",
                    }}
                  />
                )}
                <Card.Body>
                  {mode && (
                    <div className="mb-3 d-flex justify-content-center">
                      <Button
                        variant="warning"
                        disabled={
                          permission === "Rejected" || record || showModal
                        }
                        onClick={() =>
                          dispatch(practiceActions.switchModalVisibility(true))
                        }
                        className="me-3"
                      >
                        Change slides
                      </Button>
                      <ToggleButtonGroup type="checkbox">
                        <ToggleButton
                          id="cam-toggle"
                          type="checkbox"
                          checked={camPreview}
                          variant="outline-secondary"
                          disabled={permission === "Rejected"}
                          onChange={() =>
                            dispatch(avActions.switchCamPreview())
                          }
                          value="1"
                          className="ms-3"
                        >
                          {camPreview ? "Hide" : "Show"} webcam preview
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  )}
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="danger"
                      disabled={permission === "Rejected" || record}
                      onClick={() =>
                        dispatch(avActions.switchRecordingStatus())
                      }
                      className="me-3"
                    >
                      Record
                    </Button>
                    <Button
                      variant="success"
                      disabled={!record}
                      onClick={() =>
                        dispatch(avActions.switchRecordingStatus())
                      }
                      className="ms-3"
                    >
                      Finish
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <h5> Time </h5>
                  <Timer />
                </Card.Footer>
              </Card>
            </Col>

            <Col></Col>
          </Row>
        </Container>
      )}
    </>
  );
};
