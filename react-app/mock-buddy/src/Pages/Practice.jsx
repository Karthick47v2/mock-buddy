import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Container, Nav } from "react-bootstrap";
import { VideoStream } from "../Components/videoStream";
import { Slide } from "../Components/slide";
import { getNetSpeed } from "../Components/bandwidthCheck";

// Practice page

export const Practice = () => {
  /**
   * @type {[Boolean, Function]} IsRecord
   */
  const [isRecord, setIsRecord] = useState(false);
  /**
   * @type {[Boolean, Function]} IsGoodBandwidth
   */
  const [isGoodBandwidth, setIsGoodBandwidth] = useState(false);
  /**
   * @type {[Boolean, Function]} IsAccepted
   */
  const [isAccepted, setIsAccepted] = useState(false);

  /**
   * Good bandwidth threshold for Video streaming
   * @type {number}
   */
  const goodBandwidthLimit = 1536;

  useEffect(() => {
    const netInterval = setInterval(() => {
      setIsGoodBandwidth(getNetSpeed(goodBandwidthLimit));
    }, 5000);
    return () => clearInterval(netInterval);
  }, []);

  // // ask for permission on start
  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then(() => {
  //       setIsAccepted(true);
  //     })
  //     .catch(() => {
  //       setIsAccepted(false);
  //       console.log("Not"); //////////////////////////////////////////// UI
  //     });
  // }, []);

  return (
    <div>
      <Container>
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
              {/* <VideoStream isRecord={isRecord} /> */}
              <Slide />
              <Card.Body>
                <Card.Title>Video Stream</Card.Title>
                <Card.Text>
                  Bandwidth CHECK BY SOCKET BANDWIDTH : "Bad"
                </Card.Text>
                <Button
                  variant="danger"
                  disabled={!isAccepted || isRecord}
                  onClick={() => setIsRecord(true)}
                >
                  Record
                </Button>
                <Button
                  variant="success"
                  disabled={!isRecord}
                  onClick={() => setIsRecord(false)}
                >
                  Finish
                </Button>
              </Card.Body>
              <Card.Footer>Print time</Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};
