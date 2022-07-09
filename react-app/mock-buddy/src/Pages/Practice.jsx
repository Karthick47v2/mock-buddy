import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Container, Nav } from "react-bootstrap";
import { VideoStream } from "../Components/videoStream";
import { Slide } from "../Components/slide";
import { getNetSpeed } from "../Components/netspeedChecker";

// Practice page

export const Practice = () => {
  // record status
  const [isRecord, setIsRecord] = useState(false);
  // bandwidth quality
  const [isGoodBandwidth, setIsGoodBandwidth] = useState(false);
  // media usage permission response
  const [isAccepted, setIsAccepted] = useState(false);

  const goodBandwidthLimit = 1024;

  useEffect(() => {
    const netInterval = setInterval(() => {
      setIsGoodBandwidth(getNetSpeed(goodBandwidthLimit));
    }, 5000);
    return () => clearInterval(netInterval);
  }, []);

  // ask for permission on start
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => {
        setIsAccepted(true);
      })
      .catch(() => {
        setIsAccepted(false);
        console.log("Not"); //////////////////////////////////////////// UI
      });
  }, []);

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
                  defaultActiveKey="#first"
                  className="justify-content-center"
                >
                  <Nav.Link href="#first">Presentation Mode</Nav.Link>
                  <Nav.Link href="#second">Speech Mode</Nav.Link>
                  <Nav.Link href="#third">Audio only</Nav.Link>
                </Nav>
              </Card.Header>
              <VideoStream isRecord={isRecord} />
              <Slide />
              <Card.Body>
                <Card.Title>Video Stream</Card.Title>
                <Card.Text>
                  Bandwidth : {isGoodBandwidth ? "Good" : "Bad"}
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
