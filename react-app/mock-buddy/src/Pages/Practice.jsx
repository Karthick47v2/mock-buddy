import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  ToggleButton,
  Container,
  Nav,
  ToggleButtonGroup,
} from "react-bootstrap";
import { VideoStream } from "../Components/videoStream";
import { Slide } from "../Components/slide";
import { PermissionRejectAlert } from "../Components/permissionRAlert";
import { Timer } from "../Components/timer";

// Practice page

export const Practice = () => {
  /**
   * @type {[Boolean, Function]} IsRecord
   */
  const [isRecord, setIsRecord] = useState(false);
  /**
   * @type {[String, Function]} PermissionStatus
   */
  const [permissionStatus, setPermissionStatus] = useState(null);
  /**
   * @type {[Boolean, Function]} ShowModal
   */
  const [showModal, setShowModal] = useState(true);
  /**
   * @type {[String, Function]} ImgSrc
   */
  const [imgSrc, setImgSrc] = useState(null);
  /**
   * @type {[Boolean, Function]} CamPreview
   */
  const [camPreview, setCamPreview] = useState(false);

  // ask for permission on start
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => {
        setPermissionStatus("Accepted");
      })
      .catch(() => {
        setPermissionStatus("Rejected");
      });
  }, []);

  return (
    <div>
      <Container>
        {permissionStatus === "Rejected" && <PermissionRejectAlert />}
        <Row>
          <Col></Col>
          <Col>
            <Card
              className="text-center"
              bg="dark"
              text="white"
              key="Dark"
              border="dark"
            >
              <Card.Header>
                <Nav
                  variant="pills"
                  defaultActiveKey="#presentation"
                  className="justify-content-center"
                >
                  <Nav.Link href="#presentation">Presentation Mode</Nav.Link>
                  <Nav.Link href="#speech">Speech Mode</Nav.Link>
                </Nav>
              </Card.Header>
              <Slide showModal={showModal} handleShowModal={setShowModal} />
              <div
                style={{ position: "absolute", zIndex: "-1", margin: "125px" }}
              >
                <VideoStream
                  isRecord={isRecord}
                  imageSrc={imgSrc}
                  handleImgSrc={setImgSrc}
                />
              </div>
              {camPreview && imgSrc && (
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
                <Card.Title className="mt-5">Video Stream</Card.Title>
                <div className="mb-3 d-flex justify-content-center">
                  <Button
                    variant="warning"
                    disabled={
                      permissionStatus === "Rejected" || isRecord || showModal
                    }
                    onClick={() => setShowModal(true)}
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
                      disabled={permissionStatus === "Rejected" || isRecord}
                      onChange={(e) => setCamPreview(e.currentTarget.checked)}
                      value="1"
                      className="ms-3"
                    >
                      {camPreview ? "Hide" : "Show"} webcam preview
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="danger"
                    disabled={permissionStatus === "Rejected" || isRecord}
                    onClick={() => setIsRecord(true)}
                    className="me-3"
                  >
                    Record
                  </Button>
                  <Button
                    variant="success"
                    disabled={!isRecord}
                    onClick={() => setIsRecord(false)}
                    className="ms-3"
                  >
                    Finish
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer>
                <Timer isActive={isRecord} />
              </Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};
